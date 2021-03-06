StartTest(t => {
    const
        gantt = bryntum.query('gantt'),
        task  = gantt.taskStore.getById(15);

    t.chain(
        { dblclick : () => gantt.getElementFromTaskRecord(task) },

        {
            waitForSelector : '.b-taskeditor',
            desc            : 'Task editor appeared'
        },

        {
            waitForSelector : '.b-tabpanel-tab-title:textEquals(Common)',
            desc            : 'Renamed General -> Common tab appeared'
        },
        {
            waitForSelectorNotFound : '.b-tabpanel-tab-title:textEquals(Notes)',
            desc                    : 'Notes tab is removed'
        },

        next => {
            t.ok(gantt.taskEdit.editor.widgetMap.deadlineField, 'Custom Deadline field appeared');
            next();
        },

        {
            waitForSelector : '.b-tabpanel-tab :textEquals(Files)',
            desc            : 'Files tab appeared'
        },
        
        { click : '.b-colorfield .b-icon-picker' },

        { click : '.b-color-picker-item[data-id=red]' },

        { click : '.b-button:contains(Save)' },

        {
            waitFor : () => {
                const element = gantt.getElementFromTaskRecord(task);
                return window.getComputedStyle(element).backgroundColor === 'rgb(255, 0, 0)';
            }
        },

        () => {
            t.pass('Color changed');
        }
    );
});
