import { DateHelper, ProjectGenerator, AjaxHelper } from '../../build/gantt.module.js?437987';

StartTest(t => {
    Object.assign(window, {
        // The test harness needs this so that it can mock URLs for testing purposes.
        AjaxHelper
    });

    let gantt;

    t.beforeEach(() => gantt && gantt.destroy());

    t.it('Should show task editor when double clicking task', t => {
        gantt = t.getGantt({
            appendTo : document.body,

            features : {
                taskTooltip : false
            },

            resources : t.getResourceStoreData()
        });
        const investigate = gantt.taskStore.getAt(2);

        let oldWidth;

        t.chain(
            { dblClick : '.b-gantt-task.id11' },

            { waitForSelector : '.b-taskeditor' },

            next => {
                const oldEl = gantt.getElementFromTaskRecord(investigate);

                oldWidth = oldEl.offsetWidth;

                t.is(document.querySelector('.b-name input').value, gantt.taskStore.getById(11).name, 'Correct name');
                next();
            },

            { click : () => gantt.features.taskEdit.editor.widgetMap.fullDurationField.triggers.spin.upButton },

            { click : () => gantt.features.taskEdit.editor.widgetMap.saveButton.element },

            { waitFor : () => gantt.getElementFromTaskRecord(investigate).offsetWidth > oldWidth }
        );
    });

    // https://app.assembla.com/spaces/bryntum/tickets/9416-adding-a-resource-in-the-taskeditor--then-clicking-save-throws-an-error-/
    t.it('Should not throw error when asdding resource to "from" side of new dependency.', t => {
        gantt = t.getGantt({
            appendTo : document.body,

            features : {
                taskTooltip : false
            },

            resources : t.getResourceStoreData()
        });

        t.livesOk(() => {
            t.chain(
                { moveMouseTo : '[data-task-id="231"]' },

                { moveMouseTo : '.b-sch-terminal-right' },

                { drag : '[data-task-id="231"] .b-sch-terminal-right', to : '[data-task-id="232"]', dragOnly : true },

                { moveMouseTo : '[data-task-id="232"] .b-sch-terminal-left' },

                { mouseup : null },

                { dblclick : '[data-task-id="232"]' },

                { waitForSelector : '.b-taskeditor' },

                { click : '.b-tabpanel-tab-title:contains(Resources)' },

                { click : '.b-resourcestab .b-add-button' },

                { click : '.b-grid .b-cell-editor' },

                { click : '.b-list-item[data-index="0"]' },

                { click : '.b-button:contains(Save)' },

                { waitForPropagate : gantt.project },

                { dblclick : '[data-task-id="231"]' },

                { waitForSelector : '.b-taskeditor' },

                { click : '.b-tabpanel-tab-title:contains(Resources)' },

                { click : '.b-resourcestab .b-add-button' },

                { click : '.b-grid .b-cell-editor' },

                { click : '.b-list-item[data-index="0"]' },

                { click : '.b-button:contains(Save)' },

                { waitForPropagate : gantt.project }
            );
        });
    });

    t.it('Should save assignments after task edit save button click', t => {

        gantt = t.getGantt({
            appendTo : document.body,

            features : {
                taskTooltip : false
            },

            resources : t.getResourceStoreData()
        });

        const investigate = gantt.project.eventStore.getAt(2),
            Arcady = gantt.project.resourceStore.getById(1);

        t.chain(
            { dblClick : '.b-gantt-task.id11' },

            { waitForSelector : '.b-taskeditor' },

            { click : '.b-tabpanel-tab-title:contains(Resources)' },

            { click : '.b-resourcestab .b-add-button' },

            { click : '.b-grid .b-cell-editor' },

            { wheel : '.b-list', deltaY : '-100' },

            { click : '.b-list-item[data-index="0"]' },

            { click : '.b-button:contains(Save)' },

            { waitForPropagate : gantt.project },

            () => {
                t.is(investigate.assignments.length, 1, 'Investigate task now has one assignment');
                t.is(investigate.assignments[0].resource, Arcady, 'Arcady is assigned to the task');
            }
        );
    });

    t.it('Should not change assignments after task edit cancel button click', t => {

        gantt = t.getGantt({
            appendTo : document.body,

            features : {
                taskTooltip : false
            },

            resources : t.getResourceStoreData()
        });

        const investigate = gantt.project.eventStore.getAt(2);

        t.chain(
            { dblClick : '.b-gantt-task.id11' },

            { waitForSelector : '.b-taskeditor' },

            { click : '.b-tabpanel-tab-title:contains(Resources)' },

            { click : '.b-resourcestab .b-add-button' },

            { click : '.b-grid .b-cell-editor' },

            { wheel : '.b-list', deltaY : '-100' },

            { click : '.b-list-item[data-index="0"]' },

            { click : '.b-button:contains(Cancel)' },

            { waitForSelectorNotFound : '.b-taskeditor-editing' },

            () => {
                t.is(investigate.assignments.length, 0, 'Investigate task now has no assignments');
            }
        );
    });

    t.describe('Advanced form works ok', t => {
        t.it('Should set constraints', t => {
            gantt = t.getGantt({
                appendTo : document.body,
                columns  : [
                    { type : 'name', width : 200 },
                    { type : 'constrainttype', width : 100 },
                    { type : 'constraintdate', width : 100 }
                ],
                subGridConfigs : {
                    locked : { width : 400 }
                },
                features : {
                    taskTooltip : false
                }
            });

            const project = gantt.project;
            let task = gantt.taskStore.getById(13);

            t.chain(
                { waitForPropagate : project },
                async() => {
                    task.constraintType = 'muststarton';
                    task.constraintDate = task.startDate;
                    return project.propagate();
                },
                { dblclick : '.id13.b-gantt-task', desc : 'Edit task with constraint' },
                { click : '.b-tabpanel-tab-title:contains(Advanced)' },
                next => {
                    t.hasValue('[name=constraintType]', 'Must start on', 'Constraint type value is ok');
                    t.hasValue('[name=constraintDate]', DateHelper.format(task.startDate, 'L'), 'Constraint date value is ok');
                    next();
                },
                { click : '[name=constraintDate]' },
                { type : '[DOWN][LEFT][ENTER]' },
                next => {
                    document.querySelector('[name=constraintType]').value = '';
                    next();
                },
                { click : '[name=constraintType]' },
                { type : 's[ENTER]' },
                { click : 'button:contains(Save)' },

                { waitForPropagate : gantt.project },

                next => {
                    t.is(task.constraintType, 'startnoearlierthan', 'Constraint type is ok');
                    t.is(task.constraintDate, task.startDate, 'Constraint date is ok');
                    next();
                },

                { dblclick : '.id13.b-gantt-task', desc : 'Edit task with constraint' },
                { click : '.b-tabpanel-tab-title:contains(Advanced)' },
                { click : '[name=constraintType]' },
                next => {
                    t.hasValue('[name=constraintType]', 'Start no earlier than', 'Constraint type value is ok');
                    t.hasValue('[name=constraintDate]', DateHelper.format(task.startDate, 'L'), 'Constraint date value is ok');

                    next();
                },
                { click : '.b-constrainttypepicker .b-icon-remove' },
                { click : 'button:contains(Save)' },

                { waitForPropagate : gantt.project },

                next => {
                    t.is(task.constraintType, null, 'Constraint type is ok');
                    // t.is(task.constraintDate, new Date(2017, 0, 15), 'Constraint date is ok');
                    next();
                }
            );
        });

        t.it('Should set calendars', t => {
            gantt = t.getGantt({
                appendTo : document.body,
                columns  : [
                    { type : 'name', width : 200 },
                    { type : 'calendar', width : 100 }
                ],
                subGridConfigs : {
                    locked : { width : 300 }
                },
                features : {
                    taskTooltip : false
                }
            });

            const project = gantt.project;
            let task = gantt.taskStore.getById(13),
                originalEnd = task.endDate;

            task.setCalendar('night');

            t.chain(
                { waitForPropagate : project },

                { dblclick : '.id13.b-gantt-task', desc : 'Edit task' },
                { click : '.b-tabpanel-tab-title:contains(Advanced)' },
                { waitForSelector : 'input[name=calendar]' },

                next => {
                    t.hasValue('input[name=calendar]', 'Night shift', 'Calendar value is ok');
                    next();
                },

                { click : '[name=calendar]' },
                { type : '[DOWN][UP][ENTER][ENTER]' },
                { waitForPropagate : project },

                next => {
                    t.is(task.calendar.id, 'business', 'Calendar id is ok');
                    t.notOk(task.endDate.getTime() === originalEnd.getTime(), 'Task is updated');
                    t.contentLike('.id13 [data-column=calendar]', 'Business', 'Column cell value is ok');
                }
            );
        });
    });

    t.it('Should disable certain fields for parent tasks', t => {
        gantt = t.getGantt({
            appendTo : document.body,
            features : {
                taskTooltip : false
            }
        });

        t.chain(
            { dblClick : '[data-task-id="1"]' },

            { waitForSelector : '.b-taskeditor' },

            () => {
                const { fullDurationField, effortField, endDateField, percentDoneField } = gantt.features.taskEdit.editor.widgetMap;

                t.ok(fullDurationField.disabled, 'Duration disabled');
                t.ok(effortField.disabled, 'Effort disabled');
                t.ok(endDateField.disabled, 'Finish disabled');
                t.ok(percentDoneField.disabled, 'Percent done disabled');
            }
        );
    });

    t.it('Should not cancel edit when editing a new resource allocation', t => {

        gantt = t.getGantt({
            appendTo : document.body,

            features : {
                taskTooltip : false
            },

            resources : t.getResourceStoreData()
        });

        let editorContext;

        t.chain(
            { dblClick : '.b-gantt-task.id11' },

            { waitForSelector : '.b-taskeditor' },

            next => {
                gantt.features.taskEdit.editor.widgetMap.tabs.layout.animateCardChange = false;
                next();
            },

            { click : '.b-tabpanel-tab-title:contains(Resources)' },

            { click : '.b-resourcestab .b-add-button' },

            {
                waitFor : () => {
                    editorContext = gantt.features.taskEdit.editor.widgetMap['resourcestab-grid'].features.cellEdit.editorContext;

                    return editorContext && editorContext.editor.containsFocus;
                }
            },

            { click : () => editorContext.editor.inputField.triggers.expand.element },

            { click : () => editorContext.editor.inputField.picker.getItem(1) },

            { type : '[TAB]' },

            // Nothing should happen. The test is that editing does not finish
            // so there's no event to wait for.
            { waitFor : 500 },

            () => {
                editorContext = gantt.features.taskEdit.editor.widgetMap['resourcestab-grid'].features.cellEdit.editorContext;

                t.ok(editorContext && editorContext.editor.containsFocus);
            }
        );
    });

    t.iit('Should preserve scroll when cancelling changes', async(t) => {
        const config = await ProjectGenerator.generateAsync(100, 30, () => {});

        const project = t.getProject(config);

        gantt = t.getGantt({
            appendTo  : document.body,
            startDate : config.startDate,
            endDate   : config.endDate,
            project
        });

        let task = gantt.taskStore.getAt(gantt.taskStore.count - 1),
            scroll;

        t.chain(
            { waitForPropagate : gantt },
            { waitForSelector : '.b-gantt-task' },
            async() => gantt.scrollTaskIntoView(task),
            { dblclick : () => gantt.getElementFromTaskRecord(task) },
            { waitForSelector : '.b-taskeditor' },
            { click : () => gantt.features.taskEdit.editor.widgetMap.fullDurationField.triggers.spin.upButton },
            next => {
                scroll = gantt.scrollTop;

                const detacher = gantt.on({
                    renderTask({ taskRecord }) {
                        if (taskRecord === task) {
                            detacher();
                            next();
                        }
                    }
                });

                t.click('.b-popup-close');
            },
            () => {
                t.is(gantt.scrollTop, scroll, 'Scroll is intact');
            }
        );
    });

    t.it('Should be able to show editor programmatically', async(t) => {
        const config = await ProjectGenerator.generateAsync(1, 30, () => {});

        const project = t.getProject(config);

        gantt = t.getGantt({
            appendTo  : document.body,
            startDate : config.startDate,
            endDate   : config.endDate,
            project
        });

        t.chain(
            { waitForPropagate : gantt },
            { waitForSelector : '.b-gantt-task' },

            (next) => {
                gantt.editTask(gantt.taskStore.rootNode.firstChild);
                next();
            },

            { waitForSelector : '.b-gantt-taskeditor' }
        );
    });

    t.it('Should fire events upon show', async(t) => {
        const config = await ProjectGenerator.generateAsync(1, 30, () => {});

        const project = t.getProject(config);

        gantt = t.getGantt({
            appendTo  : document.body,
            startDate : config.startDate,
            endDate   : config.endDate,
            project
        });

        await project.waitForPropagateCompleted();

        t.firesOnce(gantt, 'beforeTaskEdit');
        t.firesOnce(gantt, 'beforeTaskEditShow');

        gantt.editTask(gantt.taskStore.rootNode.firstChild);
    });

    t.it('Should be possible to cancel show', async(t) => {
        const config = await ProjectGenerator.generateAsync(1, 30, () => {});

        const project = t.getProject(config);

        gantt = t.getGantt({
            appendTo  : document.body,
            startDate : config.startDate,
            endDate   : config.endDate,
            project
        });

        await project.waitForPropagateCompleted();

        t.firesOnce(gantt, 'beforeTaskEdit');
        t.wontFire(gantt, 'beforeTaskEditShow');

        gantt.on('beforeTaskEdit', () => false);

        gantt.editTask(gantt.taskStore.rootNode.firstChild);
        t.selectorNotExists('.b-gantt-taskeditor', 'No editor in DOM');
    });

    t.it('Should fire events upon save', async(t) => {
        const config = await ProjectGenerator.generateAsync(1, 30, () => {});

        const project = t.getProject(config);

        gantt = t.getGantt({
            appendTo  : document.body,
            startDate : config.startDate,
            endDate   : config.endDate,
            project
        });

        await project.waitForPropagateCompleted();

        t.firesOnce(gantt, 'beforeTaskSave');

        gantt.editTask(gantt.taskStore.rootNode.firstChild);

        await gantt.features.taskEdit.save();
    });

    t.it('Should be possible to cancel save', async(t) => {
        const config = await ProjectGenerator.generateAsync(1, 30, () => {});

        const project = t.getProject(config);

        gantt = t.getGantt({
            appendTo  : document.body,
            startDate : config.startDate,
            endDate   : config.endDate,
            project
        });

        await project.waitForPropagateCompleted();

        t.firesOnce(gantt, 'beforeTaskSave');
        t.wontFire(gantt.taskEdit.getEditor(), 'hide');

        gantt.on('beforeTaskSave', () => false);

        gantt.editTask(gantt.taskStore.rootNode.firstChild);

        await gantt.features.taskEdit.save();

        t.selectorExists('.b-gantt-taskeditor', 'Editor still visible');
    });

    t.it('Should fire events upon delete', async(t) => {
        const config = await ProjectGenerator.generateAsync(1, 30, () => {});

        const project = t.getProject(config);

        gantt = t.getGantt({
            appendTo  : document.body,
            startDate : config.startDate,
            endDate   : config.endDate,
            project
        });

        await project.waitForPropagateCompleted();

        t.firesOnce(gantt, 'beforeTaskDelete');

        gantt.editTask(gantt.taskStore.rootNode.firstChild);

        await gantt.features.taskEdit.delete();
    });

    t.it('Should be possible to cancel delete', async(t) => {
        const config = await ProjectGenerator.generateAsync(1, 30, () => {});

        const project = t.getProject(config);

        gantt = t.getGantt({
            appendTo  : document.body,
            startDate : config.startDate,
            endDate   : config.endDate,
            project
        });

        await project.waitForPropagateCompleted();

        t.firesOnce(gantt, 'beforeTaskDelete');
        t.wontFire(gantt.taskEdit.getEditor(), 'hide');

        gantt.on('beforeTaskDelete', () => false);

        gantt.editTask(gantt.taskStore.rootNode.firstChild);

        await gantt.features.taskEdit.delete();

        t.selectorExists('.b-gantt-taskeditor', 'Editor still visible');
    });

    t.it('Should fire events with correct params', async(t) => {
        const config = await ProjectGenerator.generateAsync(1, 1, () => {});

        const project = t.getProject(config);

        gantt = t.getGantt({
            appendTo  : document.body,
            startDate : config.startDate,
            endDate   : config.endDate,
            project
        });

        await project.waitForPropagateCompleted();

        const task = gantt.taskStore.getById(3);

        t.firesOnce(gantt, 'beforeTaskEdit');
        gantt.on('beforeTaskEdit', (event) => {
            t.is(event.source, gantt, 'gantt');
            t.is(event.taskEdit, gantt.features.taskEdit, 'taskEdit');
            t.is(event.taskRecord, task, 'taskRecord');
            t.isInstanceOf(event.taskElement, HTMLElement, 'element');
        });

        t.firesOnce(gantt, 'beforeTaskEditShow');
        gantt.on('beforeTaskEditShow', (event) => {
            t.is(event.source, gantt, 'gantt');
            t.is(event.taskEdit, gantt.features.taskEdit, 'taskEdit');
            t.is(event.taskRecord, task, 'taskRecord');
            t.isInstanceOf(event.taskElement, HTMLElement, 'element');
            t.is(event.editor, gantt.features.taskEdit.getEditor(), 'editor');
        });

        t.firesOnce(gantt, 'beforeTaskSave');
        gantt.on('beforeTaskSave', (event) => {
            t.is(event.source, gantt, 'gantt');
            t.is(event.taskRecord, task, 'taskRecord');
            t.is(event.editor, gantt.features.taskEdit.getEditor(), 'editor');
        });

        t.firesOnce(gantt, 'beforeTaskDelete');
        gantt.on('beforeTaskDelete', (event) => {
            t.is(event.source, gantt, 'gantt');
            t.is(event.taskRecord, task, 'taskRecord');
            t.is(event.editor, gantt.features.taskEdit.getEditor(), 'editor');
        });

        gantt.on('beforeTaskSave', () => false);
        gantt.on('beforeTaskDelete', () => false);

        gantt.editTask(task);

        await gantt.features.taskEdit.save();
        await gantt.features.taskEdit.delete();
    });

    t.it('Should be possible to hide delete button', async(t) => {
        const config = await ProjectGenerator.generateAsync(1, 1, () => {});

        const project = t.getProject(config);

        gantt = t.getGantt({
            appendTo  : document.body,
            startDate : config.startDate,
            endDate   : config.endDate,
            project,
            features  : {
                taskEdit : {
                    showDeleteButton : false
                }
            }
        });

        await project.waitForPropagateCompleted();

        gantt.editTask(gantt.taskStore.getById(3));

        t.selectorExists('.b-gantt-taskeditor button', 'Some button found');
        t.selectorNotExists('.b-gantt-taskeditor button:textEquals(Delete)', 'No delete button');
    });

    // https://app.assembla.com/spaces/bryntum/tickets/9108
    t.it('Should not report isEditing if a listener cancels the editing', async(t) => {
        gantt = t.getGantt();

        await gantt.project.waitForPropagateCompleted();

        t.notOk(gantt.features.taskEdit.isEditing, 'Task edit not editing initially');

        gantt.on('beforeTaskEdit', () => false);

        gantt.editTask(gantt.taskStore.rootNode.firstChild);

        t.notOk(gantt.features.taskEdit.isEditing, 'Task edit not editing');
    });

    // https://app.assembla.com/spaces/bryntum/tickets/8276
    t.it('Should support editing an unscheduled task', async t => {
        gantt = t.getGantt();

        const added = gantt.taskStore.rootNode.appendChild({ name : 'New task' });

        // run propagation to calculate new task fields
        await gantt.project.propagate();

        gantt.editTask(added);

        t.chain(
            { waitForSelector : '.b-gantt-taskeditor' }
        );
    });

    t.it('Should not allow to set end before start date', t => {
        gantt = t.getGantt({
            project  : t.getProject({
                calendar : 'general'
            })
        });

        let task = gantt.taskStore.getById(234);

        t.chain(
            { dblclick : '.b-gantt-task.id234' },

            { click : '.b-end-date .b-icon-angle-left' },

            {
                waitFor : () => task.endDate.getTime() === new Date(2017, 1, 9).getTime() && task.duration === 0,
                desc    : 'End date changed, duration is 0'
            },

            { click : '.b-end-date .b-icon-angle-left' },

            { waitForPropagate : gantt },

            {
                waitFor : () => task.endDate.getTime() === new Date(2017, 1, 9).getTime() && task.duration === 0,
                desc    : 'End date intact, duration is 0'
            },

            { type : '[DOWN][TOP][ENTER]' },

            { waitForPropagate : gantt },

            {
                waitFor : () => task.endDate.getTime() === new Date(2017, 1, 9).getTime() && task.duration === 0,
                desc    : 'End date intact, duration is 0'
            },

            { click : '.b-end-date .b-icon-angle-right' },

            {
                waitFor : () => task.endDate.getTime() === new Date(2017, 1, 10).getTime() && task.duration === 1,
                desc    : 'End date chaged, duration is 1'
            }
        );
    });

    t.it('Should not close on Save click if any field is invalid', async(t) => {
        gantt = t.getGantt();

        await gantt.project.waitForPropagateCompleted();

        gantt.taskStore.rootNode.firstChild.name = ''; // invalid
        gantt.editTask(gantt.taskStore.rootNode.firstChild);

        gantt.features.taskEdit.save();

        t.ok(gantt.features.taskEdit.isEditing, 'Task edit still editing');
    });

    t.it('Should support disabling', t => {
        gantt = t.getGantt();

        gantt.features.taskEdit.disabled = true;

        t.chain(
            { dblClick : '.b-gantt-task' },

            next => {
                t.selectorNotExists('.b-popup', 'Editor not shown');

                gantt.features.taskEdit.disabled = false;

                next();
            },

            { dblClick : '.b-gantt-task' },

            () => {
                t.selectorExists('.b-popup', 'Editor shown');
            }
        );
    });

    t.it('autoSync', t => {
        let syncCallCount = 0;

        t.mockUrl('test-autosync-load', (url, params, options) => {
            const
                { body }        = options,
                {
                    requestId
                }               = body;

            return {
                responseText : JSON.stringify({
                    success  : true,
                    revision : 1,
                    requestId,
                    tasks    : {
                        rows : t.getProjectTaskData()
                    },
                    calendars : {
                        rows : t.getProjectCalendarsData()
                    },
                    dependencies : {
                        rows : t.getProjectDependenciesData()
                    }
                })
            };
        });
        t.mockUrl('test-autosync-update', (url, params, options) => {
            const
                { body }        = options,
                {
                    requestId,
                    revision,
                    tasks
                }               = JSON.parse(body),
                { updated }     = tasks;

            syncCallCount++;

            return {
                responseText : JSON.stringify({
                    success  : true,
                    revision : revision + tasks.length,
                    requestId,
                    tasks    : {
                        rows : updated.map(t => ({ id : t.id }))
                    }
                })
            };
        });

        gantt = t.getGantt({
            features : {
                taskTooltip : false
            },
            project : {
                autoSync  : true,
                transport : {
                    load : {
                        url       : 'test-autosync-load',
                        paramName : 'q'
                    },
                    sync : {
                        url : 'test-autosync-update'
                    }
                }
            }
        });

        t.chain(
            { drag : '[data-task-id="11"]', offset : ['100%-5', '50%'], by : [gantt.tickSize + 1, 0] },

            // The autoSync setting worked
            { waitFor : () => syncCallCount === 1 },

            { dblClick : '[data-task-id="11"]' },

            next => {
                t.selectorExists('.b-popup', 'Editor shown');
                next();
            },

            next => {
                t.click(gantt.features.taskEdit.editor.widgetMap.endDateField.triggers.forward.element, next);
            },

            // Syncing is on a timer, so wait for it to cycle
            { waitFor : gantt.project.autoSyncTimeout * 2 },

            next => {
                // That must not have synced.
                t.is(syncCallCount, 1);

                // Cancel editing
                t.click(gantt.features.taskEdit.editor.widgetMap.cancelButton.element, next);
            },

            // Syncing is on a timer, so wait for it to cycle
            { waitFor : gantt.project.autoSyncTimeout * 2 },

            next => {
                // That must not have synced.
                t.is(syncCallCount, 1);
                next();
            },

            // Try again, but clicking the Save button
            { dblClick : '[data-task-id="11"]' },

            next => {
                t.selectorExists('.b-popup', 'Editor shown');
                next();
            },

            next => {
                t.click(gantt.features.taskEdit.editor.widgetMap.endDateField.triggers.forward.element, next);
            },

            // Syncing is on a timer, so wait for it to cycle
            { waitFor : gantt.project.autoSyncTimeout * 2 },

            next => {
                // That must not have synced.
                t.is(syncCallCount, 1);

                // Cancel editing
                t.click(gantt.features.taskEdit.editor.widgetMap.saveButton.element, next);
            },

            // Syncing is on a timer, so wait for it to cycle
            { waitFor : gantt.project.autoSyncTimeout * 2 },

            () => {
                // That must have synced.
                t.is(syncCallCount, 2);
            }
        );
    });
});
