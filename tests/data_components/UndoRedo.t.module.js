import { ConstraintType, EffectResolutionResult, Toast } from '../../build/gantt.module.js?437987';

StartTest(t => {
    let gantt;

    t.beforeEach(() => {
        gantt && gantt.destroy();
    });

    t.it('Should properly schedule tasks after undo', t => {
        gantt = t.getGantt({
            appendTo : document.body,
            tasks    : [
                {
                    id        : 1,
                    startDate : '2017-01-16',
                    duration  : 1
                },
                {
                    id        : 2,
                    startDate : '2017-01-17',
                    duration  : 1
                },
                {
                    id        : 3,
                    startDate : '2017-01-18',
                    duration  : 1
                },
                {
                    id        : 4,
                    startDate : '2017-01-16',
                    duration  : 1
                },
                {
                    id        : 5,
                    startDate : '2017-01-17',
                    duration  : 1
                },
                {
                    id       : 6,
                    expanded : true,
                    children : [
                        {
                            id        : 61,
                            startDate : '2017-01-18',
                            duration  : 1
                        }
                    ]
                }
            ],
            dependencies : [
                { fromEvent : 1, toEvent : 2 },
                { fromEvent : 2, toEvent : 3 },
                { fromEvent : 4, toEvent : 5 },
                { fromEvent : 5, toEvent : 61 }
            ]
        });

        const stm = gantt.project.getStm();

        // let's track scheduling conflicts happened
        gantt.project.on('schedulingconflict', context => {
            Toast.show('Scheduling conflict has happened ..recent changes were reverted');
            // as the conflict resolution approach let's simply cancel the changes
            context.continueWithResolutionResult(EffectResolutionResult.Cancel);

            t.fail('Scheduling conflict');
        });

        const
            event1 = gantt.taskStore.getById(1),
            event2 = gantt.taskStore.getById(2),
            event5 = gantt.taskStore.getById(5),
            event61 = gantt.taskStore.getById(61);

        t.chain(
            { waitForPropagate : gantt },

            async() => {
                stm.disabled = false;
                stm.autoRecord = true;

                await event2.setConstraint(ConstraintType.StartNoEarlierThan, new Date(2017, 1, 6));
            },

            { waitForEvent : [stm, 'recordingstop'] },

            async() => {
                stm.undo();

                t.is(event1.startDate, new Date(2017, 0, 16), 'Event 1 start is ok');
                t.is(event2.startDate, new Date(2017, 0, 17), 'Event 2 start is ok');

                await event1.setConstraint(ConstraintType.StartNoEarlierThan, new Date(2017, 0, 18));
            },

            { waitForEvent : [stm, 'recordingstop'] },

            async() => {
                t.is(event1.startDate, new Date(2017, 0, 18), 'Event 1 start is ok');
                t.is(event2.startDate, new Date(2017, 0, 19), 'Event 2 start is ok');

                await event61.setConstraint(ConstraintType.StartNoEarlierThan, new Date(2017, 1, 6));
            },

            { waitForEvent : [stm, 'recordingstop'] },

            async() => {
                stm.undo();

                t.is(event5.startDate, new Date(2017, 0, 17), 'Event 4 start is ok');
                t.is(event61.startDate, new Date(2017, 0, 18), 'Event 51 start is ok');

                await event5.setConstraint(ConstraintType.StartNoEarlierThan, new Date(2017, 0, 20));
            },

            { waitForEvent : [stm, 'recordingstop'] },

            async() => {
                t.is(event5.startDate, new Date(2017, 0, 20), 'Event 4 start is ok');
                t.is(event61.startDate, new Date(2017, 0, 21), 'Event 51 start is ok');
            }
        );
    });
});
