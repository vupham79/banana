import WidgetHelper from '../../../lib/Core/helper/WidgetHelper.js';
import Toast from '../../../lib/Core/widget/Toast.js';

/**
 * @module BackendTools
 */

export default class BackendTools {

    //region Constructor

    constructor(gantt) {
        const me = this;

        me.gantt   = gantt;
        me.project = gantt.project;
        me.stm     = me.project.stm;

        [me.saveButton, me.loadButton, me.resetButton] = WidgetHelper.append([
            {
                ref      : 'saveButton',
                type     : 'button',
                icon     : 'b-fa b-fa-cloud-upload-alt',
                color    : 'b-green b-raised',
                text     : 'Save',
                tooltip  : 'Save changes to server',
                disabled : true,
                onAction : () => me.onSaveClick()
            },
            {
                ref      : 'loadButton',
                type     : 'button',
                icon     : 'b-fa b-fa-cloud-download-alt',
                color    : 'b-blue b-raised',
                text     : 'Load',
                tooltip  : 'Load data from server',
                onAction : () => me.onLoadClick()

            },
            {
                ref      : 'resetButton',
                type     : 'button',
                icon     : 'b-fa b-fa-recycle',
                color    : 'b-red b-raised',
                text     : 'Reset',
                tooltip  : 'Reset server data',
                style    : 'margin-right: 1em',
                onAction : () => me.onResetClick()
            }
        ], {
            insertFirst : document.getElementById('tools') || document.body
        });

        // track project changes to disable/enable "Save" button
        gantt.project.on({
            beforeLoad : me.onBeforeLoad,
            beforeSync : me.onBeforeSync,
            load       : me.onAfterLoadSync,
            sync       : me.onAfterLoadSync,
            haschanges : me.onProjectChanges,
            nochanges  : me.onProjectChanges,
            thisObj    : me
        });

        gantt.on({
            startCellEdit  : me.onStartCellEdit,
            cancelCellEdit : me.onEndCellEdit,
            finishCellEdit : me.onEndCellEdit,
            thisObj        : me
        });

    }

    //endregion

    //region internal procedures

    loadFromServer(requestOptions) {
        Toast.hideAll();

        const me = this;

        function triggerLoadRequest() {
            me.project.load(requestOptions).catch(() => {});
        }

        // If task editor was open we wait until editing is canceled and then load or reset data
        if  (me.gantt.features.taskEdit.isEditing) {
            me.gantt.on({
                taskEditCanceled : triggerLoadRequest,
                thisObj          : me,
                once             : true
            });
        }
        else {
            triggerLoadRequest();
        }
    }

    //endregion

    //region Listeners

    onProjectChanges({ type }) {
        // disable "Save" button if there is no changes in the project data
        this.saveButton.disabled = type === 'nochanges';
    }

    onBeforeLoad() {
        this.gantt.maskBody('Loading data from server ...');
    }

    onBeforeSync() {
        this.gantt.maskBody('Synchronizing data with server ...');
    }

    onAfterLoadSync() {
        this.gantt.unmaskBody();
        // since we load all the stores data from the server
        // we reset undo/redo queue (it no longer makes sense)
        this.stm.disable();
        this.stm.resetQueue();
        this.stm.enable();
    }

    onEndCellEdit() {
        this.editorContext = null;
    }

    onStartCellEdit({ editorContext }) {
        this.editorContext = editorContext;
    }

    onSaveClick() {
        // finish editing before changes persisting
        const me = this;
        me.editorContext && me.gantt.features.cellEdit.finishEditing(me.editorContext);
        me.project.sync().catch(() => {});
    }

    onLoadClick() {
        this.loadFromServer();
    }

    onResetClick() {
        this.loadFromServer({ reset : true });
    }

    //endregion

    //region Error handling

    serverError(text, responseText) {
        console.error(`Error: ${text}\nServer response:\n${responseText}`);

        Toast.show({
            html : `Server response:<br>${responseText}<br>
                    <b>Please make sure that you've read readme.md file carefully
                    and setup the database connection accordingly.</b>`,
            color   : 'b-red',
            style   : 'color:white',
            timeout : 0
        });
    }

    //endregion

};
