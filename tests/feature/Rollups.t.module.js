
StartTest(t => {
    let gantt;

    t.beforeEach(() => {
        gantt && !gantt.isDestroyed && gantt.destroy();
    });

    t.it('Rollups should represent child tasks', async t => {
        gantt = t.getGantt({
            appendTo  : document.body,
            startDate : '2019-07-07',
            endDate   : '2019-07-29',
            features  : {
                rollups     : true,
                taskTooltip : false
            },
            rowHeight : 70,
            project   : {
                startDate  : '2019-07-07',
                duration   : 30,
                eventsData : [
                    {
                        id       : 1,
                        name     : 'Project A',
                        duration : 30,
                        expanded : true,
                        children : [
                            {
                                id       : 11,
                                name     : 'Child 1',
                                duration : 1,
                                leaf     : true,
                                cls      : 'child1'
                            },
                            {
                                id       : 12,
                                name     : 'Child 2',
                                duration : 5,
                                leaf     : true,
                                cls      : 'child1'
                            },
                            {
                                id       : 13,
                                name     : 'Child 3',
                                duration : 0,
                                leaf     : true,
                                cls      : 'child1'
                            }
                        ]
                    }
                ],
                dependenciesData : [{
                    id        : 1,
                    fromEvent : 12,
                    toEvent   : 13
                }]
            }
        });
        const
            taskStore = gantt.taskStore,
            projectA = taskStore.first,
            child1 = projectA.children[0];

        t.chain(
            // Move in from the right, not diagonally from 0, 0 which would be the default.
            { moveMouseTo : '.b-task-rollup[data-index="2"]', offset : ['100%+60', '50%'] },

            { moveMouseTo : '.b-task-rollup[data-index="2"]' },

            // Only over the Child 3 milestone
            { waitForSelector : '.b-tooltip:contains(Child 3):not(:contains(Child 1)):not(:contains(Child 2))' },

            { moveMouseTo : '.b-task-rollup[data-index="1"]' },

            // Only over Child 2
            { waitForSelector : '.b-tooltip:contains(Child 2):not(:contains(Child 1)):not(:contains(Child 3))' },

            { moveMouseTo : '.b-task-rollup[data-index="0"]' },

            // We're over child 1 *and* child 2 now, not child 3
            { waitForSelector : '.b-tooltip:contains(Child 1):contains(Child 2):not(:contains(Child 3))' },

            { moveMouseTo : [0, 0] },

            next => {
                projectA.removeChild(child1);
                next();
            },

            // Rollups must be trimmed on child remove
            { waitForSelectorNotFound : '.b-task-rollup[data-index="2"]' },

            next => {
                projectA.insertChild(child1, projectA.children[0]);
                next();
            },

            // Rollups must be added to oo child add
            { waitForSelector : '.b-task-rollup[data-index="2"]' }
        );
    });
});
