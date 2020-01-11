StartTest(t => {
    let gantt;

    t.beforeEach(() => gantt && gantt.destroy());

    t.it('Should show non-working time ranges from project calendar', t => {
        const project = t.getProject({ calendar : 'general' });

        gantt = t.getGantt({
            appendTo  : document.body,
            startDate : new Date(2017, 0, 14),
            endDate   : new Date(2017, 0, 30),
            features  : {
                nonWorkingTime : true  // Enabled by default
            },
            project
        });

        t.chain(
            { waitForPropagate : project },
            async() => {
                t.selectorCountIs('.b-grid-headers .b-sch-nonworkingtime', 8, '8 non-working days');

                project.calendarManagerStore.add({
                    id        : 'custom',
                    intervals : [
                        {
                            recurrentStartDate : 'on Fri at 0:00',
                            recurrentEndDate   : 'on Tue at 0:00',
                            isWorking          : false
                        }
                    ]
                });

                project.calendar =  project.calendarManagerStore.getById('custom');
                project.propagate();
            },
            { waitForPropagate : project },
            async() => {
                t.selectorCountIs('.b-grid-headers .b-sch-nonworkingtime', 16, '16 non-working days');
                project.calendar =  null;
                project.propagate();
            },
            { waitForPropagate : project },
            () => {
                t.selectorCountIs('.b-grid-headers .b-sch-nonworkingtime', 0, 'non-working days are not visible');
            }
        );
    });
});
