import { Gantt, ResourceStore } from '../../build/gantt.module.js?437987';

StartTest(t => {

    let gantt;

    Object.assign(window, {
        Gantt,
        ResourceStore
    });

    t.beforeEach(() => gantt && gantt.destroy());

    t.it('Should allow setting negative lag', t => {
        gantt = t.getGantt({
            appendTo       : document.body,
            width          : 400,
            subGridConfigs : {
                locked : {
                    width : 1
                }
            },
            features : {
                taskTooltip : false
            }
        });

        t.chain(
            { dblClick : '[data-task-id="14"]' },
            { click : '.b-tabpanel-tab-title:textEquals(Predecessors)' },
            { dblClick : '.b-grid-row[data-index=0] .b-grid-cell:textEquals(0 days)' },
            { type : '[ARROWDOWN][ENTER]' },
            { waitForSelector : '.b-grid-row[data-index=0] .b-grid-cell:textEquals(-1 days)' }
        );
    });

    // https://app.assembla.com/spaces/bryntum/tickets/8015
    t.it('Rejecting dependency removing and removing again should work', t => {

        gantt = t.getGantt({
            appendTo : document.body,

            features : {
                taskTooltip : false
            },

            resources : t.getResourceStoreData()
        });

        const investigate = gantt.project.eventStore.getById(11);
        const assignResources = gantt.project.eventStore.getById(12);

        let iaDep;

        t.chain(
            { waitForPropagate : gantt.project },

            { dblclick : '.b-gantt-task.id11' },

            { click : '.b-tabpanel-tab-title:contains(Successors)' },

            { click : '.b-successorstab .b-add-button' },

            { click : '.b-grid .b-cell-editor' },

            { wheel : '.b-list', deltaY : '-100' },

            { click : '.b-list-item:contains(Assign resources)' },

            { waitForPropagate : gantt.project },

            { click : '.b-button:contains(Save)' },

            { waitForSelectorNotFound : '.b-gantt-taskeditor' },

            next => {
                // Checking for new dependency
                iaDep = gantt.project.dependencyStore.find(d => d.fromEvent === investigate && d.toEvent === assignResources);
                t.ok(iaDep, 'Dependency is found');
                next();
            },

            { dblclick : '.b-gantt-task.id11' },

            { click : '.b-tabpanel-tab-title:contains(Successors)' },

            { click : '.b-grid-row:contains(Assign resources)' },

            { click : '.b-successorstab .b-remove-button' },

            { waitForPropagate : gantt.project },

            { click : '.b-button:contains(Cancel)' },

            { waitForSelectorNotFound : '.b-taskeditor-editing' },

            next => {
                // Checking for new dependency
                iaDep = gantt.project.dependencyStore.find(d => d.fromEvent === investigate && d.toEvent === assignResources);
                t.ok(iaDep, 'Dependency is found');
                next();
            },

            { waitForPropagate : gantt.project },

            { dblclick : '.b-gantt-task.id11' },

            { click : '.b-tabpanel-tab-title:contains(Successors)' },

            { click : '.b-grid-row:contains(Assign resources)' },

            { click : '.b-successorstab .b-remove-button', desc : 'Here' },

            { waitForPropagate : gantt.project },

            { click : '.b-button:contains(Save)' },

            { waitForSelectorNotFound : '.b-taskeditor-editing' },

            () => {
                // Checking for dependency abscense
                t.notOk(gantt.project.dependencyStore.includes(iaDep), 'Dependency has been removed');
                t.is(investigate.startDate, assignResources.startDate, 'Assign resources shifted back to project start');
            }
        );

    });
});
