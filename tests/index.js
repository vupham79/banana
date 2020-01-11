var Project      = new Siesta.Project.Browser(),
    isSmokeTest  = Project.getQueryParam('smoke'),
    isRelease    = Project.getQueryParam('release'),
    isTrial      = true,
    isTC         = location.href.indexOf('IS_TEAMCITY') > -1;

/*  */

Project.configure({
    title                   : 'Bryntum Gantt Test Suite',
    isReadyTimeout          : 20000, // longer for memory profiling which slows things down
    testClass               : BryntumGanttTest,
    disableCaching          : false,
    autoCheckGlobals        : false,
    keepResults             : false,
    cachePreload            : isSmokeTest,
    failOnResourceLoadError : true,
    runCore                 : 'sequential',
    forceDOMVisible         : bowser.safari,
    recorderConfig          : {
        recordOffsets    : false,
        ignoreCssClasses : [
            'b-sch-event-hover',
            'b-hover',
            'b-dirty',
            'b-focused',
            'b-contains-focus'
        ],
        shouldIgnoreDomElementId : function(id) {
            return /^b-/.test(id);
        }
    }
});

function getItems(mode) {

    var examples = [
        {
            pageUrl : '../examples/advanced',
            url     : 'examples/advanced.t.js'
        },
        {
            pageUrl : '../examples/aggregation-column',
            url     : 'examples/aggregation-column.t.js'
        },
        'basic',
        'bigdataset',
        {
            url        : 'esmodule',
            includeFor : 'module'
        },
        {
            pageUrl : '../examples?develop&reset&theme=default',
            url     : 'examples/examplebrowser.t.js'
        },
        {
            pageUrl    : '../examples/exporttoexcel',
            url        : 'examples/exporttoexcel.t.js',
            skipMonkey : true
        },
        {
            pageUrl     : '../examples/extjsmodern',
            url         : 'examples/extjsmodern.t.js',
            keepPageUrl : true
        },
        'labels',
        {
            pageUrl : '../examples/localization?develop&reset',
            url     : 'examples/localization.t.js'
        },
        {
            pageUrl     : '../examples/php?config=config-c-' + mode + '.php',
            url         : 'examples/php.t.js',
            // only run backend test in chrome
            skip        : !bowser.chrome,
            monkeySetup : function(config) {
                // rename config used for monkey to ensure another database is used
                config.pageUrl = config.pageUrl.replace('?config=config-c-', '?config=config-monkey-');
            }
        },
        {
            url        : 'requirejs',
            includeFor : 'es6'
        },
        'responsive',
        'scripttag',
        'taskcontextmenu',
        {
            pageUrl : '../examples/taskeditor',
            url     : 'examples/taskeditor.t.js'
        },
        'theme',
        'timeranges',
        'tooltips',
        {
            pageUrl : '../examples/resourceassignment',
            url     : 'examples/resourceassignment.t.js'
        }
    ];

    // Frameworks (angular, ionic, react, vue, etc.)

    var frameworks = [];

    if (isTrial) {
        // The following frameworks demos require building before test. We build demos for trial
        frameworks.push(
            {
                pageUrl       : '../examples/angular/advanced',
                url           : 'examples/angular/advanced.t.js',
                viewportWidth : 2000,
                keepPageUrl   : true
            },
            {
                pageUrl     : '../examples/angular/taskeditor',
                url         : 'examples/angular/taskeditor.t.js',
                keepPageUrl : true
            },
            '../examples/angular/pdf-export',
            {
                pageUrl     : '../examples/react/javascript/advanced',
                url         : 'examples/react/advanced.t.js',
                keepPageUrl : true
            },
            {
                pageUrl     : '../examples/react/javascript/basic',
                url         : 'examples/react/basic.t.js',
                keepPageUrl : true
            },
            '../examples/react/javascript/pdf-export',
            {
                pageUrl     : '../examples/react/typescript/basic',
                url         : 'examples/react/basic-typescript.t.js',
                keepPageUrl : true
            },
            {
                pageUrl     : '../examples/vue/javascript/advanced',
                url         : 'examples/vue/advanced.t.js',
                keepPageUrl : true
            },
            '../examples/vue/javascript/pdf-export'
        );
    }

    var items = [
        {
            group   : 'Docs',
            pageUrl : {
                umd     : '../docs/index.umd.html?reset',
                default : '../docs/?reset'
            },
            keepPageUrl             : true,
            subTestTimeout          : 120000,
            timeout                 : 120000,
            // the grid docs are not built, and `docs/resources/docs.css` is thus missing
            failOnResourceLoadError : false,
            items                   : [
                {
                    url                    : 'docs/open-all-links.t.js',
                    disableNoTimeoutsCheck : true
                }
            ]
        },
        {
            group : 'Gantt',
            items : [
                {
                    group : 'Columns',
                    items : [
                        'column/AddNewColumn.t.js',
                        'column/CalendarColumn.t.js',
                        'column/ConstraintColumns.t.js',
                        'column/DependencyColumn.t.js',
                        'column/DurationColumn.t.js',
                        'column/EffortColumn.t.js',
                        'column/EventModeColumn.t.js',
                        'column/ManuallyScheduledColumn.t.js',
                        'column/MilestoneColumn.t.js',
                        'column/NameColumn.t.js',
                        'column/PercentDoneColumn.t.js',
                        'column/ResourceAssignmentColumn.t.js',
                        'column/SchedulingModeColumn.t.js',
                        'column/SequenceColumn.t.js',
                        'column/TaskDateColumns.t.js'
                    ]
                },
                {
                    group : 'Data components',
                    items : [
                        'data_components/project_creation.t.js',
                        'data_components/Tasks.t.js',
                        // these 2 are postponed, since we first implement the new dependency validation code
                        // and then see whats next
                        // 'data_components/042_dependency_store.t.js',
                        // 'data_components/042_dependency_store2.t.js',
                        'data_components/AssignmentManipulationStore.t.js',
                        'data_components/persisting.t.js',
                        'data_components/UndoRedo.t.js'
                    ]
                },
                {
                    group : 'Dependencies',
                    items : [
                        'dependencies/dependency_rendering.t.js',
                        'dependencies/dependency_rendering_2.t.js'
                    ]
                },
                {
                    group : 'CRUD manager',
                    items : [
                        'crud_manager/01_add_stores.t.js',
                        {
                            url                    : 'crud_manager/20_empty_dataset.t.js',
                            failOnPromiseRejection : false
                        },
                        // run the test in chrome only ..no need to test backend in all browsers
                        { // eslint-disable-line no-undef
                            url  : 'crud_manager/11_backend.t.js',
                            load : {
                                url    : '../examples/php/php/load.php',
                                params : {
                                    config : 'config-backend-' + mode + '.php'
                                }
                            },
                            sync : {
                                url    : '../examples/php/php/sync.php',
                                params : {
                                    config : 'config-backend-' + mode + '.php'
                                }
                            },
                            resetUrl       : '../examples/php/php/reset.php?config=config-backend-' + mode + '.php',
                            setupUrl       : '../examples/php/php/setup.php?config=config-backend-' + mode + '.php',
                            defaultTimeout : 180000,
                            skip           : !bowser.chrome || isRelease
                        }
                    ]
                },
                {
                    group       : 'Localization',
                    alsoPreload : {
                        umd : [
                            '../build/locales/gantt.locale.En.js',
                            '../build/locales/gantt.locale.Nl.js',
                            '../build/locales/gantt.locale.Ru.js',
                            '../build/locales/gantt.locale.SvSE.js',
                            '../examples/localization/custom-locale-de.js'
                        ],
                        default : [{
                            type         : 'js',
                            isEcmaModule : true,
                            content      : [
                                'import En from "../lib/Gantt/localization/En.js";',
                                'import Nl from "../lib/Gantt/localization/Nl.js";',
                                'import Ru from "../lib/Gantt/localization/Ru.js";',
                                'import SvSE from "../lib/Gantt/localization/SvSE.js";',
                                'import "../examples/localization/custom-locale-de.js";',
                                'window.bryntum.locales = { En, Nl, Ru, SvSE, De: window.bryntum.locales.De };'
                            ].join('')
                        }]
                    },
                    items : [
                        {
                            url        : 'localization/MissingLocalization.t.js',
                            includeFor : 'es6',
                            skip       : !bowser.chrome
                        },
                        {
                            // run only against "module" bundle and only in chrome
                            url        : 'localization/UnusedLocalization.t.js',
                            includeFor : 'module',
                            keepUrl    : true,
                            skip       : !bowser.chrome
                        },
                        {
                            url         : 'localization/DependencyTypeLocalization.t.js',
                            usesConsole : true
                        },
                        'localization/TaskEditorLocalization.t.js',
                        'localization/AddNewColumnLocalization.t.js',
                        'localization/ProjectLinesLocalization.t.js'
                    ]
                },
                {
                    group : 'Features',
                    items : [
                        'feature/Baselines.t.js',
                        {
                            group       : 'Export',
                            alsoPreload : [
                                {
                                    type    : 'css',
                                    // Without this we cannot get 50px high header container. And we need it
                                    content : 'body { font-family: Arial, Helvetica, sans-serif;  font-size: 14px; }'
                                }
                            ],
                            items : [
                                'feature/export/Export.t.js',
                                'feature/export/MultiPage.t.js',
                                'feature/export/RowsOptions.t.js',
                                'feature/export/ScheduleRange.t.js',
                                'feature/export/SinglePage.t.js'
                            ]
                        },
                        {
                            url         : 'feature/CellEdit.t.js',
                            usesConsole : true
                        },
                        'feature/ColumnLines.t.js',
                        'feature/CriticalPaths.t.js',
                        'feature/Dependencies.t.js',
                        'feature/DependencyEdit.t.js',
                        'feature/NonWorkingTime.t.js',
                        'feature/Pan.t.js',
                        'feature/PercentBar.t.js',
                        'feature/ProjectLines.t.js',
                        'feature/ProgressLine.t.js',
                        'feature/Rollups.t.js',
                        'feature/TaskContextMenu.t.js',
                        'feature/TaskDrag.t.js',
                        'feature/TaskDragCreate.t.js',
                        'feature/TaskEdit.t.js',
                        'feature/TaskEditDependency.t.js',
                        'feature/TaskEditConfiguration.t.js',
                        'feature/TaskEditSTM.t.js',
                        'feature/TaskResize.t.js',
                        'feature/TaskTooltip.t.js',
                        'feature/TimeRanges.t.js'
                    ]
                },
                {
                    group       : 'Grid + Scheduler',
                    preload     : [],
                    alsoPreload : [
                        '../build/gantt.default.css'
                    ],
                    items : [
                        {
                            url         : 'grid+scheduler/grid-and-scheduler-umd-online.t.js',
                            pageUrl     : 'grid+scheduler/grid-and-scheduler-umd-online.html',
                            includeFor  : 'umd',
                            keepPageUrl : true,
                            usesConsole : true
                        },
                        {
                            url        : 'grid+scheduler/grid-and-scheduler-module-online.t.js',
                            includeFor : 'module'
                        }
                    ].concat(!isTC ? [
                        {
                            url         : 'grid+scheduler/grid-and-scheduler-umd.t.js',
                            pageUrl     : 'grid+scheduler/grid-and-scheduler-umd.html',
                            includeFor  : 'umd',
                            keepPageUrl : true
                        },
                        {
                            url        : 'grid+scheduler/grid-and-scheduler-module.t.js',
                            includeFor : 'module'
                        }
                    ] : [])
                },
                {
                    group : 'Model',
                    items : [
                        'model/AssignmentModel.t.js',
                        'model/DependencyModel.t.js',
                        'model/TaskModel.t.js'
                    ]
                },
                {
                    group : 'Widgets',
                    items : [
                        'widget/AssignmentGrid.t.js',
                        'widget/AssignmentField.t.js',
                        'widget/TaskEditor.t.js',
                        'widget/Timeline.t.js'
                    ]
                },
                {
                    group : 'view',
                    items : [
                        {
                            group : 'Mixin',
                            items : [
                                'view/mixin/GanttState.t.js'
                            ]
                        },
                        {
                            url        : 'view/GanttBase.t.js',
                            includeFor : 'es6',
                            // To prevent default preloads, which will include Gantt.js
                            preload    : [
                                '../build/gantt.default.css'
                            ]
                        },
                        {
                            url         : 'view/gantt.t.js',
                            alsoPreload : [
                                'view/data.js'
                            ]
                        },
                        'view/TaskHover.t.js',
                        'view/TaskSelection.t.js',
                        'view/TaskRendering.t.js',
                        'view/Zooming.t.js',
                        'view/035_task_indent_dirty.t.js',
                        'view/035_task_indent.t.js',
                        'view/035_task_indent2.t.js'
                    ]
                },
                {
                    group : 'Util',
                    items : [
                        'util/TableExporter.t.js',
                        'util/ResourceAssignmentParser.t.js'
                    ]
                }
            ]
        },
        {
            group       : 'Trial',
            usesConsole : true,
            items       : [
                {
                    url  : 'examples/trial-expired-example.t.js',
                    skip : !isTrial || bowser.msie
                }
            ]
        },
        {
            group       : 'Examples',
            usesConsole : isTrial,
            items       : examples.filter(function(example) {
                // Filter out examples used for monkey tests only
                return example && example.pageUrl != null && example.url != null;
            })
        },
        {
            group       : 'Monkey Tests for Examples ',
            usesConsole : isTrial,
            items       : BryntumTestHelper.prepareMonkeyTests(examples)
        },
        {
            group       : 'Frameworks',
            usesConsole : isTrial,
            config      : { skipSanityChecks : true },
            items       : frameworks.filter(function(framework) {
                // Filter out frameworks used for monkey tests only
                return framework.pageUrl != null && framework.url != null;
            })
        },
        {
            group          : 'Monkey tests for Frameworks',
            usesConsole    : isTrial,
            config         : { skipSanityChecks : true },
            subTestTimeout : 120000,
            timeout        : 120000,
            items          : BryntumTestHelper.prepareMonkeyTests(frameworks)
        }
    ];

    return BryntumTestHelper.prepareItems(items, mode, isTrial);
}

const groups = [];

if (!bowser.msie) {
    /*  */

    groups.push({
        group   : 'Using module bundle',
        preload : [
            '../build/gantt.default.css',
            {
                type         : 'js',
                isEcmaModule : true,
                content      : [
                    'import { Gantt, ProjectModel, TaskStore, ResourceStore, AssignmentStore, DependencyStore } from "../build/gantt.module.js";',
                    'Object.assign(window, { Gantt, ProjectModel, TaskStore, ResourceStore, AssignmentStore, DependencyStore });'
                ].join('')
            }
        ],
        isEcmaModule : true,
        collapsed    : true,
        items        : getItems('module')
    });
}

groups.push({
    group   : 'Using umd bundle',
    preload : [
        '../build/gantt.umd.js',
        '../build/gantt.default.css'
    ],
    isEcmaModule : false,
    collapsed    : false,
    items        : getItems('umd')
});

Project.start(groups);
