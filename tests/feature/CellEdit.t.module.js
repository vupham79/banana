import { AllColumns } from '../../build/gantt.module.js?437987';

StartTest(t => {
    let gantt;

    t.beforeEach(() => gantt && gantt.destroy());

    t.it('Should be able to tab through all cells while editing', t => {
        gantt = t.getGantt({
            appendTo : document.body,

            columns : Object.values(AllColumns).map(ColumnClass => ({ type : ColumnClass.type }))
        });

        t.chain(
            { dblClick : '.b-grid-cell:nth-child(2)' },

            { type : '[TAB]'.repeat(gantt.columns.count * 3) }, // All cells in three rows (+ some extra since some are not editable)

            () => {
                t.pass('Tabbed through without exception');
            }
        );
    });

    t.it('Should be able to tab through all cells for new record', t => {
        gantt = t.getGantt({
            tasks : [
                {}
            ],

            appendTo : document.body,

            columns : Object.values(AllColumns).map(ColumnClass => ({ type : ColumnClass.type }))
        });

        t.chain(
            { dblClick : `.b-grid-cell:nth-child(2)` },

            { type : '[TAB]'.repeat(gantt.columns.count * 2) }, // All cells in three rows (+ some extra since some are not editable)

            () => {
                t.pass('Tabbed through without exception');
            }
        );
    });

    t.it('Should validate dependencies', t => {
        gantt = t.getGantt({
            appendTo : document.body,
            columns  : [
                { type : 'name', width : 200 },
                { type : 'predecessor', width : 100 },
                { type : 'successor', width : 100 }
            ],
            startDate : '2019-05-20',
            endDate   : '2019-05-26',
            tasks     : [
                {
                    id        : 1,
                    cls       : 'task1',
                    name      : 'Task 1',
                    startDate : '2019-05-20',
                    duration  : 1
                },
                {
                    id        : 2,
                    cls       : 'task2',
                    name      : 'Task 2',
                    startDate : '2019-05-20',
                    duration  : 1,
                    expanded  : true,
                    children  : [
                        {
                            id        : 21,
                            cls       : 'task21',
                            name      : 'Task 21',
                            startDate : '2019-05-20',
                            duration  : 1
                        },
                        {
                            id        : 22,
                            cls       : 'task22',
                            name      : 'Task 22',
                            startDate : '2019-05-21',
                            duration  : 1
                        }
                    ]
                },
                {
                    id        : 3,
                    cls       : 'task3',
                    name      : 'Task 3',
                    startDate : '2019-05-20',
                    duration  : 1
                }
            ],
            dependencies : [
                { id : 1, fromEvent : 1, toEvent : 21 },
                { id : 2, fromEvent : 21, toEvent : 22 }
            ]
        });
        const
            task1 = gantt.taskStore.getById(1),
            task3 = gantt.taskStore.getById(3);

        let dependencyField, predecessorsCell;

        t.chain(
            { waitForPropagate : gantt },

            // Type invalid predecessor ID

            { dblclick : () =>  predecessorsCell = document.querySelector('.task1 [data-column=predecessors]') },

            {
                waitFor : () => {
                    if (gantt.features.cellEdit.editorContext && gantt.features.cellEdit.editorContext.editor.containsFocus) {
                        dependencyField = gantt.features.cellEdit.editorContext.editor.inputField;
                        return true;
                    }
                }
            },

            // Enter an invalid predecessor
            { type : '2[ENTER]', target : () => dependencyField.input },

            { waitForSelector : '.b-toast' },
            next => {
                t.selectorCountIs('.b-toast', 1, 'Only 1 toast appears');
                next();
            },
            { waitForSelectorNotFound : '.b-toast' },

            // After the toast has been and gone, task1 should have no predecessors
            next => {
                t.is(task1.predecessors.length, 0, 'No predecessors added');
                next();
            },

            // Open the predecessors dropdown
            { type : '[DOWN]', target : () => dependencyField.input },

            // Pick predecessor from dropdown
            { click : '.b-list-item.task3 .b-to' },

            // TAB off to trigger update
            { type : '[TAB]', target : () => dependencyField.input },

            // Dependency should be there
            next => {
                t.is(task1.predecessors.length, 1, 'Predecessor added');
                t.is(task1.predecessors[0].fromEvent, task3, 'Predecessor is ok');
                t.is(predecessorsCell.textContent, '3', 'Cell content is ok');
                next();
            },

            // Go back
            { dblclick : '.task1 [data-column=predecessors]' },

            // Open the predecessors dropdown
            { type : '[DOWN]', target : () => dependencyField.input },

            // Change to 3FF by toggling the "to side"
            { click : '.b-list-item.task3 .b-to' },

            // TAB off to trigger update
            { type : '[TAB]', target : () => dependencyField.input },

            // Dependency should have changed
            next => {
                const task = gantt.taskStore.getById(1);

                t.is(task.predecessors.length, 1, 'Predecessor added');
                t.is(task.predecessors[0].fromEvent, gantt.taskStore.getById(3), 'Predecessor is ok');
                t.is(predecessorsCell.textContent, '3FF', 'Cell content is ok');
                next();
            }
        );
    });
});
