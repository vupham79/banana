import { DateHelper } from '../../build/gantt.module.js?437987';

StartTest(t => {
    let gantt;

    t.beforeEach(() => gantt && gantt.destroy());

    t.it('Basic resizing should work', t => {
        gantt = t.getGantt({
            appendTo : document.body,
            features : {
                taskTooltip : false
            }
        });

        const
            task = gantt.taskStore.getById(11),
            initialWidth = gantt.getElementFromTaskRecord(task).offsetWidth,
            initialStart = task.startDate,
            initialEnd = task.endDate,
            initialDuration = task.duration,
            deltaX = gantt.tickSize * 2;

        t.chain(
            { drag : '[data-task-id=11]', offset : ['100%-3', '50%'], by : [deltaX, 0] },

            (next, el) => {
                t.is(task.startDate, initialStart, 'startDate unaffected');
                t.is(task.duration, initialDuration + 2, 'Correct duration after resize');
                t.is(task.endDate, DateHelper.add(initialEnd, 2, 'days'), 'Correct endDate after resize');
                t.isApprox(el.offsetWidth, initialWidth + deltaX, 'Correct element width after resize');
                next();
            }
        );
    });

    t.it('Resize on the weekend should redraw the event in case of non-working time adjustment', async t => {
        gantt = t.getGantt({
            startDate : new Date(2019, 3, 8),
            tasks     : [],
            appendTo  : document.body,
            features  : {
                taskTooltip : false
            }
        });

        const project = gantt.project;

        // TODO: Remove this line after merge of #9033
        project.calendarManagerStore.getById('general').remove();

        project.calendarManagerStore.add({
            id        : 'general',
            intervals : [
                {
                    recurrentStartDate : 'on Sat at 0:00',
                    recurrentEndDate   : 'on Mon at 0:00',
                    isWorking          : false
                }
            ]
        });

        const [task] = project.taskStore.add({ id : 1, calendar : 'general', startDate : new Date(2019, 3, 15), endDate : new Date(2019, 3, 20) });

        await project.propagate();

        const
            initialStart = task.startDate,
            initialEnd = task.endDate,
            initialDuration = task.duration;

        let taskBoxRect;

        t.chain(
            async() => {
                taskBoxRect   = t.$('[data-task-id=1]')[0].getBoundingClientRect();
            },

            { drag : '[data-task-id=1]', offset : ['100%-3', '50%'], by : [gantt.tickSize * 1, 0] },

            async() => {
                t.is(task.startDate, initialStart, 'startDate unaffected');
                t.is(task.endDate, initialEnd, 'endDate unaffected');
                t.is(task.duration, initialDuration, 'Correct duration after resize');

                const newRect   = t.$('[data-task-id=1]')[0].getBoundingClientRect();

                t.is(newRect.left, taskBoxRect.left, 'Task element did not change position');
                t.is(newRect.right, taskBoxRect.right, 'Task element did not change position');
            }
        );
    });

    t.it('Should support resizing small elements without dragging them', t => {
        gantt = t.getGantt({
            startDate : new Date(2019, 3, 8),
            tasks     : [{ id : 1, startDate : new Date(2019, 3, 15), endDate : new Date(2019, 3, 16) }],
            appendTo  : document.body,
            features  : {
                taskTooltip : false
            }
        });

        t.wontFire(gantt, 'taskdragstart');

        t.chain(
            { drag : '[data-task-id=1]', offset : ['100%-5', '50%'], by : [20, 0] }
        );
    });
});
