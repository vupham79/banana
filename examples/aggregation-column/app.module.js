import { Gantt, ProjectModel, TaskModel } from '../../build/gantt.module.js?437987';
import shared from '../_shared/shared.module.js?437987';
/* eslint-disable no-unused-vars */

class MyTaskModel extends TaskModel {
    static get fields() {
        return [
            { name : 'cost', type : 'number' }
        ];
    }
}
// Must happen now so that field definitions are added to the prototype chain's fieldMap
MyTaskModel.exposeProperties();

const
    project = new ProjectModel({
        taskModelClass : MyTaskModel,
        transport      : {
            load : {
                url : '../_datasets/launch-saas.json'
            }
        }
    }),

    gantt = new Gantt({
        adopt   : 'container',
        project : project,
        columns : [
            { type : 'name', field : 'name', width : 250 },
            { type : 'startdate' },
            { type : 'duration' },
            {
                type       : 'aggregate',
                text       : 'Cost<br><span style="font-size:0.8em">(aggregated)</span>',
                field      : 'cost',
                width      : 100,
                htmlEncode : false,
                renderer   : ({ record, value }) => record.isLeaf ? `$${value}` : `<b>$${value}</b>`
            }
        ],
        features : {
            taskEdit : {
                editorConfig : {
                    height     : '37em',
                    extraItems : {
                        generaltab : [
                            {
                                html    : '',
                                ref     : 'costGroup',
                                dataset : {
                                    text : 'Cost'
                                },
                                cls  : 'b-divider',
                                flex : '1 0 100%'
                            },
                            {
                                type  : 'number',
                                ref   : 'costField',
                                name  : 'cost',
                                label : 'Cost',
                                flex  : '.5 0',
                                cls   : 'b-inline'
                            }
                        ]
                    }
                }
            }
        },
        listeners : {
            // Disable Cost editing for parent tasks
            beforeTaskEdit : ({ taskRecord }) => {
                gantt.taskEdit.editor.widgetMap.costField.disabled = !taskRecord.isLeaf;
            }
        }
    });

project.load();
