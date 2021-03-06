describe('Test buttons', function(t) {
    const
        panel = bryntum.query(w => w.$name == 'Panel'),
        gantt = bryntum.query(w => w.$name == 'Gantt'),
        buttons = panel.tbar.widgetMap
    ;

    !gantt.features.taskTooltip.isDestroyed && gantt.features.taskTooltip.destroy();

    t.it('Check toolbar buttons', (t) => {

        t.willFireNTimes(gantt, 'presetchange', 3);
        t.willFireNTimes(gantt, 'timeaxischange', 5);

        t.chain(
            { click : buttons.addTaskButton.element },

            { waitForSelector : 'input:focus' },

            // Create task with name foo
            { type : 'foo[ENTER]' },

            // Open task editor
            { click : buttons.editTaskButton.element },

            // rename task to bar
            { type : '[BACKSPACE][BACKSPACE][BACKSPACE]bar', target : '[name=\'name\']' },

            { click : ':textEquals(Save)' },

            (next) => {
                t.selectorNotExists('.b-grid-cell:textEquals(foo)');
                t.selectorExists('.b-grid-cell:textEquals(bar)');
                next();
            },

            { click : buttons.collapseAllButton.element },

            (next) => {
                t.is(gantt.taskStore.find(task => !task.isLeaf && task.parent === gantt.taskStore.rootNode && task.isExpanded(gantt.taskStore)), null, 'No expanded nodes found');
                next();
            },

            { click : buttons.expandAllButton.element },

            (next) => {
                t.is(gantt.taskStore.find(task => !task.isLeaf && task.parent === gantt.taskStore.rootNode && !task.isExpanded(gantt.taskStore)), null, 'No collapsed nodes found');
                next();
            },

            // These should trigger 1 timeaxischange each
            { click : buttons.zoomInButton.element },

            { click : buttons.zoomOutButton.element },

            { click : buttons.zoomToFitButton.element },

            { click : buttons.previousButton.element },

            { click : buttons.nextButton.element }

        ); // eo chain
    }); // eo it('Check toolbar buttons')

    t.it('Should support turning features on and off', (t) => {
        t.chain(
            { click : buttons.featuresButton.element },

            // dependencies
            { click : '.b-menu-text:textEquals(Draw dependencies)' },
            { waitForSelectorNotFound : '.b-sch-dependency' },
            { click : '.b-menu-text:textEquals(Draw dependencies)' },
            { waitForSelector : '.b-sch-dependency' },
            // eof dependencies

            // labels
            { click : '.b-menu-text:textEquals(Task labels)' },
            { waitForSelectorNotFound : '.b-gantt-task-wrap:not(.b-sch-released).b-sch-label' },
            { click : '.b-menu-text:textEquals(Task labels)' },
            { waitForSelector : '.b-gantt-task-wrap .b-sch-label' },
            // eo labels

            // project lines
            { click : '.b-menu-text:textEquals(Project lines)' },
            (next) => {
                t.selectorNotExists('.b-gantt-project-line:textEquals(Project start)');
                next();
            },
            { click : '.b-menu-text:textEquals(Project lines)' },
            (next) => {
                t.selectorExists('.b-gantt-project-line:textEquals(Project start)');
                next();
            },
            // eo project lines

            // non-working time
            { click : '.b-menu-text:textEquals(Highlight non-working time)' },
            (next) => {
                t.selectorNotExists('.b-sch-nonworkingtime');
                next();
            },
            { click : '.b-menu-text:textEquals(Highlight non-working time)' },
            (next) => {
                t.selectorExists('.b-sch-nonworkingtime');
                next();
            },
            // eo non-working time

            // schedule collapsing
            { click : '.b-menu-text:textEquals(Hide schedule)' },
            (next) => {
                t.ok(gantt.subGrids.normal.collapsed, 'Schedule collapsed');
                next();
            },
            { click : '.b-menu-text:textEquals(Hide schedule)' },

            () => {
                t.notOk(gantt.subGrids.normal.isCollapsed, 'Schedule expanded');
            }
            // eo schedule collapsing

        ); // eo chain

    }); // eo it('should support turning features on and off')

}); // eo describe Test buttons

// eof
