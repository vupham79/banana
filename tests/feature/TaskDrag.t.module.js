import { DateHelper, DomHelper, ProjectGenerator, Rectangle } from '../../build/gantt.module.js?437987';

StartTest(t => {
    let gantt;

    t.beforeEach(() => {
        gantt && gantt.destroy();
    });

    t.it('Basic dragging should work', t => {

        gantt = t.getGantt({
            appendTo : document.body,
            features : {
                taskTooltip : false
            }
        });

        const
            task       = gantt.taskStore.getById(11),
            taskSelector = `[data-task-id=${task.id}]`,
            initialX     = DomHelper.getTranslateX(t.query(taskSelector)[0]),
            initialStart = task.startDate,
            deltaX       = gantt.tickSize * 2;

        t.chain(
            { drag : taskSelector, by : [deltaX, 0] },

            (next, el) => {
                t.is(task.startDate, DateHelper.add(initialStart, 2, 'days'), 'Correct startDate after drag');
                t.isApprox(DomHelper.getTranslateX(el), initialX + deltaX, 'Correct x after drag');
            }
        );
    });

    t.it('Dragging a parent in a big data set should work', async t => {
        const config = await ProjectGenerator.generateAsync(500, 50, () => {});

        gantt = t.getGantt({
            appendTo  : document.body,
            project   : config,
            startDate : config.startDate,
            endDate   : config.endDate,
            features  : {
                taskTooltip : false
            }
        });

        let initialPosition;

        t.chain(
            { waitForPropagate : gantt },

            next => {
                // remember initial left coordinate
                initialPosition = Rectangle.from(document.querySelector('[data-task-id="2"]'), gantt.timeAxisSubGridElement).x;
                next();
            },

            { drag : '[data-task-id="2"]', by : [100, 0], desc : 'Task dragged +100 pixels to the right' },

            { waitForPropagate : gantt.project },

            () => {
                t.isApprox(Rectangle.from(document.querySelector('[data-task-id="2"]'), gantt.timeAxisSubGridElement).x, initialPosition + 100, 'Correct position');
            }
        );
    });

    t.it('Dragging a task to before the project start date should fail and reset', async t => {
        const config = await ProjectGenerator.generateAsync(500, 50, () => {});
        gantt = t.getGantt({
            appendTo  : document.body,
            project   : config,
            // Create space to the left to drag into
            startDate : DateHelper.add(config.startDate, -7, 'days'),
            endDate   : config.endDate,
            features  : {
                taskTooltip  : false,
                projectLines : true
            }
        });
        let startX;

        t.chain(
            { waitForPropagate : gantt },
            next => {
                startX = document.querySelector('[data-task-id="3"]').getBoundingClientRect().left;
                next();
            },

            // Drag to before project start date
            { drag : '[data-task-id="3"]', by : [-100, 0], desc : 'Dragging to before project start date' },

            { waitForPropagate : gantt.project },

            {
                waitFor : () => document.querySelector('[data-task-id="3"]').getBoundingClientRect().left === startX,
                desc    : 'Task reverted to original position'
            }
        );
    });

    t.it('Should live ok when dragging outside of timeline view', t => {
        gantt = t.getGantt({
            appendTo : document.body,
            features : {
                taskTooltip : false
            }
        });

        t.chain(
            { waitForPropagate : gantt },
            { drag : '.b-gantt-task.id12', to : '.id12' },
            { drag : '.b-gantt-task.id12', to : '.b-sch-header-timeaxis-cell' }
        );
    });

    t.it('Should reschedule project after task reordering', t => {
        gantt = t.getGantt({
            appendTo : document.body,
            features : {
                taskTooltip : false
            }
        });

        t.chain(
            { waitForPropagate : gantt },
            { drag : '.id13', to : '.id21', toOffset : [50, 10] },
            {
                waitFor : () => {
                    let task1 = gantt.taskStore.getById(13),
                        task2 = gantt.taskStore.getById(2);

                    return task1.parent === task2 && task2.startDate.getTime() === task1.startDate.getTime();
                }
            }
        );
    });

    t.it('Dragging should drag the real task element', t => {

        gantt = t.getGantt({
            appendTo : document.body,
            features : {
                taskTooltip : false
            }
        });

        const
            task         = gantt.taskStore.getById(11),
            taskEl       = gantt.getElementFromTaskRecord(task).parentNode,
            taskSelector = `[data-task-id=${task.id}]`,
            initialX     = DomHelper.getTranslateX(t.query(taskSelector)[0]),
            initialStart = task.startDate,
            deltaX       = gantt.tickSize * 2;

        t.chain(
            { drag : taskSelector, by : [deltaX, 0], dragInly : true },

            (next, el) => {
                const taskEls = Array.from(document.querySelectorAll('[data-task-id="11"]'));

                // Task element must not be duplicated
                t.is(taskEls.length, 1);

                // All references to a task bar must reference the real task's element.
                t.is(gantt.features.taskDrag.dragData.eventBarEls[0], taskEl);
                t.is(taskEls[0], taskEl);

                t.is(task.startDate, DateHelper.add(initialStart, 2, 'days'), 'Correct startDate after drag');
                t.isApprox(DomHelper.getTranslateX(el), initialX + deltaX, 'Correct x after drag');
            }
        );
    });

});
