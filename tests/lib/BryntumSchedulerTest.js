Class('BryntumSchedulerTest', {
    // eslint-disable-next-line no-undef
    isa : BryntumGridTest, // Have to do `chmod a+r tests/lib/BryntumGridTest.js` after build (644 access rights)

    override : {
        mimicFocusOnMouseDown : function(el, mouseDownEvent) {
            // Allow mousedown on label to run its course
            if (el.tagName !== 'LABEL') {
                this.SUPER(el, mouseDownEvent);
            }
        }
    },

    methods : {
        getTimeAxis : function(TimeAxis, PresetManager, presetName, cfg) {
            const Date = this.global.Date;

            return new TimeAxis(this.global.Object.assign({
                startDate    : new Date(2010, 1, 1),
                endDate      : new Date(2010, 1, 11),
                weekStartDay : 1,
                viewPreset   : presetName
            }, cfg));
        },

        getAssignmentStore : function(config, nbrAssignments = 5) {
            const AssignmentStore = this.global.AssignmentStore;

            return new AssignmentStore(this.global.Object.assign({

                data : (function() {
                    const records = [];
                    for (let i = 1; i <= nbrAssignments; i++) {
                        records.push({
                            id         : 'a' + i,
                            eventId    : i,
                            resourceId : 'r' + i
                        });
                    }

                    return records;
                })()
            }, config || {}));
        },

        getEventStore : function(config, nbrEvents = 5, storeClass = this.global.EventStore) {
            const { Date, Object } = this.global;

            return new storeClass(Object.assign({

                data : (function() {
                    const events = [];
                    for (let i = 1; i <= nbrEvents; i++) {
                        events.push({
                            id         : i,
                            cls        : 'event' + i,
                            resourceId : 'r' + i,
                            name       : 'Assignment ' + i,
                            startDate  : new Date(2011, 0, 3 + i),
                            endDate    : new Date(2011, 0, 5 + i)
                        });
                    }

                    return events;
                })()
            }, config || {}));
        },

        getResourceStore : function(config) {
            const ResourceStore = this.global.ResourceStore;

            config = config || {};

            return new ResourceStore(this.global.Object.assign({
                data : [
                    { id : 'r1', name : 'Mike' },
                    { id : 'r2', name : 'Linda' },
                    { id : 'r3', name : 'Don' },
                    { id : 'r4', name : 'Karen' },
                    { id : 'r5', name : 'Doug' },
                    { id : 'r6', name : 'Peter' }
                ]
            }, config));
        },

        getResourceStore2 : function(config, nbrResources) {
            const ResourceStore = this.global.ResourceStore;

            return new ResourceStore(this.global.Object.assign({
                data : (function() {
                    let resources = [];
                    for (let i = 1; i <= nbrResources; i++) {
                        resources.push({
                            id   : 'r' + i,
                            name : 'Resource ' + i
                        });
                    }

                    return resources;
                })()
            }, config));
        },

        getResourceTreeStore : function(config) {
            const ResourceStore = this.global.ResourceStore;

            config = config || {};

            return new ResourceStore(this.global.Object.assign({
                tree : true,
                data : [
                    {
                        id : 'r1',

                        name     : 'Kastrup Airport',
                        expanded : true,

                        children : [
                            {
                                id       : 'r2',
                                name     : 'Terminal A',
                                expanded : false,

                                children : [
                                    {
                                        id       : 'r3',
                                        name     : 'Gates 1 - 5',
                                        expanded : true,

                                        children : [
                                            {
                                                id   : 'r4',
                                                name : 'Gate 1'
                                            },
                                            {
                                                id   : 'r5',
                                                name : 'Gate 2'
                                            },
                                            {
                                                id   : 'r6',
                                                name : 'Gate 3'
                                            },
                                            {
                                                id   : 'r7',
                                                name : 'Gate 4'
                                            },
                                            {
                                                id   : 'r8',
                                                name : 'Gate 5'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id   : 'r42222',
                                name : 'Gate 1214312421'
                            }
                        ]
                    }
                    // eof Kastrup
                ]

                // eof data

            }, config));
        },

        getDependencyStore : function(config, nbrEvents) {
            const DependencyStore = this.global.DependencyStore;

            if (nbrEvents === undefined) nbrEvents = 5;

            return new DependencyStore(this.global.Object.assign({

                data : (function() {
                    const dependencies = [];
                    for (let i = 1; i <= nbrEvents - 1; i++) {
                        dependencies.push({
                            id   : i,
                            from : i,
                            to   : i + 1
                        });
                    }
                    return dependencies;
                })()

            }, config || {}));
        },

        getScheduler : function(config, nbrEvents) {
            const
                { Date, Scheduler, Object } = this.global;

            config = config || {};

            if (!config.features) {
                config.features = {
                    eventEdit        : false, // some tests not written to have event editor or context menu
                    eventContextMenu : false,
                    contextMenu      : false
                };
            }

            // Secret flag to easily get a scheduler tree
            //if (config.__tree) {
            //    return this.getSchedulerTree(config, nbrEvents);
            //}

            if (config.dependencyStore === true) {
                config.dependencyStore = this.getDependencyStore({}, nbrEvents);
            }

            if ((config.dependencyStore || config.dependencies) && !config.features.dependencies) config.features.dependencies = true;

            if (!('startDate' in config)) {
                config.startDate = new Date(2011, 0, 3);
                config.endDate = new Date(2011, 0, 13);
            }

            if (!config.events && !config.eventStore) {
                config.eventStore = this.getEventStore({}, nbrEvents);
            }

            if (!config.resources && !config.resourceStore) {
                config.resourceStore = this.getResourceStore();
            }

            if (!config.appendTo) {
                config.appendTo = this.global.document.body;
            }

            var scheduler = new Scheduler(Object.assign({
                viewPreset : 'dayAndWeek',
                rowHeight  : 45,
                // Setup static columns
                columns    : [
                    { text : 'Name', sortable : true, width : 100, field : 'name', locked : true }
                ],

                destroyStores : true,

                useInitialAnimation : false

            }, config));

            if (scheduler.isVisible && config.sanityCheck !== false) {
                this.checkGridSanity(scheduler);
            }

            return scheduler;
        },

        getVerticalScheduler : function(config) {
            const { Date, Object, document } = this.global;

            if (!config) {
                config = {};
            }

            return new this.global.Scheduler(Object.assign({
                appendTo : document.body,

                mode : 'vertical',

                startDate : new Date(2019, 5, 1),
                endDate   : new Date(2019, 6, 1),

                useInitialAnimation   : false,
                enableEventAnimations : false,

                barMargin : 0,

                events : [
                    { id : 1, name : 'Event 1', resourceId : 'r1', startDate : new Date(2019, 4, 28), duration : 2 },
                    { id : 2, name : 'Event 2', resourceId : 'r1', startDate : new Date(2019, 4, 29), duration : 4 },
                    { id : 3, name : 'Event 3', resourceId : 'r2', startDate : new Date(2019, 5, 1), duration : 4 },
                    { id : 4, name : 'Event 4', resourceId : 'r3', startDate : new Date(2019, 5, 5), duration : 5 },
                    { id : 5, name : 'Event 5', resourceId : 'r4', startDate : new Date(2019, 5, 8), duration : 2 },
                    { id : 6, name : 'Event 6', resourceId : 'r1', startDate : new Date(2019, 5, 20), duration : 2 },
                    { id : 7, name : 'Event 7', resourceId : 'r1', startDate : new Date(2019, 5, 25), duration : 2 },
                    { id : 8, name : 'Event 8', resourceId : 'r9', startDate : new Date(2019, 5, 25), duration : 2 },
                    // Initially outside of timeaxis
                    { id : 1000, name : 'Event 1000', resourceId : 'r1', startDate : new Date(2019, 4, 10), duration : 2 },
                    { id : 1001, name : 'Event 1001', resourceId : 'r1', startDate : new Date(2019, 6, 20), duration : 2 }
                ],

                resources : [
                    { id : 'r1', name : 'Resource 1', location : 'Location 1' },
                    { id : 'r2', name : 'Resource 2', location : 'Location 2' },
                    { id : 'r3', name : 'Resource 3', location : 'Location 1' },
                    { id : 'r4', name : 'Resource 4', location : 'Location 2' },
                    { id : 'r5', name : 'Resource 5', location : 'Location 1' },
                    { id : 'r6', name : 'Resource 6', location : 'Location 2' },
                    { id : 'r7', name : 'Resource 7', location : 'Location 1' },
                    { id : 'r8', name : 'Resource 8' },
                    { id : 'r9', name : 'Resource 9', location : 'Location 1' }
                ],

                resourceTimeRanges : [
                    { id : 1, name : 'Resource range 1', resourceId : 'r3', startDate : new Date(2019, 4, 28), duration : 10 }
                ],

                timeRanges : [
                    { id : 1, name : 'Range 1', startDate : new Date(2019, 4, 29), duration : 4 },
                    { id : 2, name : 'Line 2', startDate : new Date(2019, 5, 6) }
                ]
            }, config));
        },

        getVerticalSchedulerMulti : function(config) {
            if (!config) {
                config = {};
            }

            //return new this.global.Scheduler(
            return this.getVerticalScheduler(this.global.Object.assign({
                events : [
                    { id : 1, name : 'Event 1', startDate : new this.global.Date(2019, 4, 28), duration : 2 },
                    { id : 2, name : 'Event 2', startDate : new this.global.Date(2019, 4, 29), duration : 4 },
                    { id : 3, name : 'Event 3', startDate : new this.global.Date(2019, 5, 1), duration : 4 },
                    { id : 4, name : 'Event 4', startDate : new this.global.Date(2019, 5, 5), duration : 5 },
                    { id : 5, name : 'Event 5', startDate : new this.global.Date(2019, 5, 8), duration : 2 },
                    { id : 6, name : 'Event 6', startDate : new this.global.Date(2019, 5, 20), duration : 2 },
                    { id : 7, name : 'Event 7', startDate : new this.global.Date(2019, 5, 25), duration : 2 },
                    { id : 8, name : 'Event 8', startDate : new this.global.Date(2019, 5, 25), duration : 2 }
                ],

                assignments : [
                    { id : 'a1', resourceId : 'r1', eventId : 1 },
                    { id : 'a2', resourceId : 'r1', eventId : 2 },
                    { id : 'a3', resourceId : 'r1', eventId : 3 },
                    { id : 'a4', resourceId : 'r1', eventId : 4 },
                    { id : 'a5', resourceId : 'r2', eventId : 1 },
                    { id : 'a6', resourceId : 'r2', eventId : 2 },
                    { id : 'a7', resourceId : 'r3', eventId : 4 },
                    { id : 'a8', resourceId : 'r3', eventId : 5 },
                    { id : 'a9', resourceId : 'r3', eventId : 6 },
                    { id : 'a10', resourceId : 'r4', eventId : 1 },
                    { id : 'a11', resourceId : 'r5', eventId : 7 },
                    { id : 'a12', resourceId : 'r6', eventId : 8 },
                    { id : 'a13', resourceId : 'r7', eventId : 7 },
                    { id : 'a14', resourceId : 'r8', eventId : 8 },
                    { id : 'a15', resourceId : 'r9', eventId : 1 }
                ]
            }, config));
        },

        isDeeplyUnordered : function(array, toMatch, desc) {
            const
                failDesc = 'isDeeplyUnordered check failed: ' + desc,
                passDesc = 'isDeeplyUnordered check passed: ' + desc;

            if (!this.global.Array.isArray(array) || !this.global.Array.isArray(toMatch)) {
                return this.isDeeply.apply(this, arguments);
            }

            if (array.length !== toMatch.length) {
                this.fail(failDesc);
                return;
            }

            const joined = array.concat(toMatch),
                set    = new this.global.Set(joined);

            if (set.size !== array.length) {
                this.fail(failDesc);
                return;
            }

            this.pass(passDesc);
        },

        snapShotListeners : function(observable, name) {
            this._observableData = this._observableData || {};
            this._observableData[name] = {};

            // if (!name) throw 'Must provide a name for the observable';

            Object.keys(observable.eventListeners).forEach(key => {
                this._observableData[name][key] = observable.eventListeners[key].slice();
            });
        },

        verifyListeners : function(observable, name, allowedObservers) {
            let needListeners = this._observableData[name],
                count         = 0;

            function logListener(listener) {
                const result = Object.assign({}, listener);
                result.thisObj = result.thisObj && result.thisObj.constructor.name || undefined;
                return result;
            }

            allowedObservers = allowedObservers || [];

            Object.keys(observable.eventListeners).forEach(key => {
                if (!needListeners[key]) {
                    observable.eventListeners[key].forEach(listener => {
                        if (!allowedObservers.includes(listener.thisObj)) {
                            count++;
                            this.is(logListener(listener), null, `Extra ${key} event listener found`);
                        }
                    });
                }
                else {
                    observable.eventListeners[key].forEach(listener => {
                        if (!needListeners[key].includes(listener) && !allowedObservers.includes(listener.thisObj)) {
                            count++;
                            this.is(logListener(listener), null, `Extra ${key} event listener found`);
                        }
                    });

                    needListeners[key].forEach(listener => {
                        if (observable.eventListeners[key].indexOf(listener) === -1) {
                            this.is(null, logListener(listener), `${key} event listener is missing`);
                        }
                    });
                }
            });

            this.is(count, 0, 'No extra listeners found');
        },

        getHeaderAndBodyScrollValues : function(scheduler) {
            const
                bodyScroll   = scheduler.timeAxisSubGrid.scrollable.x,
                headerScroll = scheduler.timeAxisSubGrid.header.scrollable.x;

            return {
                header : headerScroll,
                body   : bodyScroll
            };
        },

        waitForHeaderAndBodyScrollSynced : function(scheduler, next) {
            this.waitFor(() => {
                const values = this.getHeaderAndBodyScrollValues(scheduler);

                return values.header === values.body;
            }, next);
        },

        waitForAnimations : function(callback) {
            const me = this;

            me.SUPER(function() {
                me.waitForSelectorNotFound('.b-animating', function() {
                    callback();
                });
            });
        },

        // waitForPropagate : async function(partOfProject, next) {
        //     const async = this.beginAsync();
        //
        //     partOfProject = partOfProject.project || partOfProject;
        //
        //     await partOfProject.waitForPropagateCompleted();
        //
        //     this.endAsync(async);
        //
        //     next();
        // },

        assertHeaderAndBodyAreScrollSynced : function(scheduler) {
            const values = this.getHeaderAndBodyScrollValues(scheduler);

            this.is(values.header, values.body, 'Header and body scroll is synced');
        },

        assertDependency : function(scheduler, dependency, { fromSide, toSide, fromBox, toBox } = {}) {
            function getPointFromBox(record, side, box) {
                let point,
                    adjustLeft  = 0,
                    adjustRight = 0,
                    adjustTop   = 0,
                    [el] = scheduler.getElementsFromEventRecord(record),
                    // taken from SchedulerRegions#adjustItemBox
                    viewStartDate = scheduler.startDate,
                    viewEndDate   = scheduler.endDate,
                    OUTSIDE_VIEW_OFFSET = 40;

                if (box) {
                    if (record.startDate > viewEndDate) {
                        box.left = box.left + OUTSIDE_VIEW_OFFSET;
                    }
                    else if (record.endDate < viewStartDate) {
                        box.left = box.left - OUTSIDE_VIEW_OFFSET;
                    }
                    box.right = box.left + box.width;
                }
                else {
                    box = el.getBoundingClientRect();
                }

                if (record.milestone) {
                    if (!el.classList.contains('b-sch-event-withicon')) {
                        adjustLeft = -1 * (adjustRight = box.height / 2);
                    }
                    else {
                        box = el.querySelector('*').getBoundingClientRect();
                    }
                }

                switch (side) {
                    case 'top'    :
                        point = [box.left + box.width / 2, box.top];
                        break;
                    case 'bottom' :
                        point = [box.left + box.width / 2, box.bottom];
                        break;
                    case 'left'   :
                        point = [box.left + adjustLeft, box.top + box.height / 2 - adjustTop];
                        break;
                    case 'right'  :
                        point = [box.right + adjustRight, box.top + box.height / 2];
                        break;
                    case 'top-left' :
                        point = [box.left + adjustLeft, box.top];
                        break;
                }

                return point;
            }

            function getFromSide(dependency) {
                return dependency.fromSide || (dependency.type < 2 ? 'left' : 'right');
            }

            function getToSide(dependency) {
                let result;

                if (dependency.toSide) {
                    result = dependency.toSide;
                }
                else {
                    result = dependency.type % 2 ? 'right' : 'left';
                }

                return result;
            }

            let from     = dependency.sourceEvent,
                to       = dependency.targetEvent;

            if (from && to) {
                // Using '_features' instead of 'features' for IE11 compatibility
                let dependencyEl     = scheduler._features.dependencies.getElementForDependency(dependency),
                    fromPoint        = getPointFromBox(from, fromSide || getFromSide(dependency), fromBox),
                    toPoint          = getPointFromBox(to, toSide || getToSide(dependency), toBox),
                    svgBox           = dependencyEl.ownerSVGElement.getBoundingClientRect(),
                    dependencyPoints = dependencyEl.getAttribute('points').split(' '),
                    depStartPoint    = dependencyPoints[0].split(',').map(item => parseInt(item)),
                    depEndPoint      = dependencyPoints[dependencyPoints.length - 1].split(',').map(item => parseInt(item)),
                    depFromPoint     = [depStartPoint[0] + svgBox.left, depStartPoint[1] + svgBox.top],
                    depToPoint       = [depEndPoint[0] + svgBox.left, depEndPoint[1] + svgBox.top];

                this.isApprox(depFromPoint[0], fromPoint[0], 1, `Dependency start point x is ok (${from.name})`);
                this.isApprox(depFromPoint[1], fromPoint[1], 1, `Dependency start point y is ok (${from.name})`);

                this.isApprox(depToPoint[0], toPoint[0], 1, `Dependency end point x is ok (${to.name})`);
                this.isApprox(depToPoint[1], toPoint[1], 1, `Dependency end point y is ok (${to.name})`);
            }
        },

        // Utility method to create steps to show contextmenu and click item.
        eventContextMenuSteps(testScheduler, event, ...menuText) {
            if (!(event instanceof testScheduler.eventStore.modelClass)) {
                event = testScheduler.eventStore.getById(event);
            }

            const steps = [
                function(next) {
                    testScheduler.scrollEventIntoView(event).then(next);
                },
                {
                    rightclick : testScheduler.getElementFromEventRecord(event)
                }
            ];

            for (let i = 0; i < menuText.length - 1; i++) {
                steps.push({
                    moveMouseTo : `.b-menuitem:contains(${menuText[i]})`
                });
            }
            steps.push({
                click : `.b-menuitem:contains(${menuText[menuText.length - 1]})`
            });

            return steps;
        },
        
        //region Export
        
        generateSingleRowHeightDataSet : function(resourcesCount, startDate, endDate) {
            const
                dateHelper      = this.global.DateHelper,
                resources       = this.global.DataGenerator.generateData(resourcesCount),
                randomGenerator = new this.global.RandomGenerator(),
                events          = [],
                dependencies    = [],
                rangeCenter     = dateHelper.add(startDate, Math.floor(dateHelper.getDurationInUnit(startDate, endDate, 'd') / 2), 'd'),
                ranges          = [
                    [null, startDate],
                    [dateHelper.add(startDate, 1, 'd'), rangeCenter],
                    [rangeCenter, endDate],
                    [endDate, null]
                ];
    
            function createRandomEvent(rangeStart, rangeEnd) {
                if (!rangeStart) {
                    rangeStart = dateHelper.add(rangeEnd, -2, 'w');
                }
                else if (!rangeEnd) {
                    rangeEnd = dateHelper.add(rangeStart, 2, 'w');
                }
        
                const
                    rangeInDays = dateHelper.getDurationInUnit(rangeStart, rangeEnd, 'd'),
                    startDay    = randomGenerator.nextRandom(rangeInDays - 1),
                    duration    = randomGenerator.nextRandom(rangeInDays - startDay),
                    startDate   = dateHelper.add(rangeStart, startDay, 'd'),
                    endDate     = dateHelper.add(startDate, duration, 'd');
        
                return {
                    startDate,
                    endDate
                };
            }
    
            resources.forEach(resource => {
                for (let i = 0; i < 4; i++) {
                    events.push(
                        Object.assign({
                            id         : `${resource.id}-${i}`,
                            resourceId : resource.id,
                            name       : `Assignment ${i + 1}`
                        }, createRandomEvent(...ranges[i]))
                    );
                }
            });
    
            events.forEach(record => {
                const
                    // Don't target dependencies to milestones, see issue #21
                    target      = randomGenerator.fromArray(events.filter(r => r.id !== record.id && r.endDate - r.startDate !== 0)),
                    fromOutside = !dateHelper.intersectSpans(record.startDate, record.endDate, startDate, endDate),
                    toOutside   = !dateHelper.intersectSpans(target.startDate, target.endDate, startDate, endDate);
        
                dependencies.push({
                    id   : `${record.id}-${target.id}`,
                    from : record.id,
                    to   : target.id,
                    type : randomGenerator.nextRandom(3),
                    toOutside,
                    fromOutside
                });
            });
    
            return { resources, events, dependencies };
        },
        
        createSchedulerForExport : function({
            verticalPages   = 1,
            horizontalPages = 1,
            rowHeight       = 50,
            rowsPerPage     = 10,
            startDate       = new this.global.Date(2019, 10, 4),
            endDate         = new this.global.Date(2019, 10, 18),
            height          = 450,
            width           = 600,
            featuresConfig  = {}
        } = {}) {
            const
                timelineWeight        = 0.75,
                paperHeight           = this.global.PaperFormat.A4.height * 96,
                paperWidth            = this.global.PaperFormat.A4.width * 96,
                viewPreset            = 'weekAndDayLetter',
                presetInstance        = this.global.PresetManager.getPreset(viewPreset),
                ticksAmount           = this.global.DateHelper.getDurationInUnit(startDate, endDate, 'd'),
                timelineMinWidth      = ticksAmount * presetInstance.tickWidth,
                proposedScheduleWidth = Math.max(horizontalPages * paperWidth * timelineWeight, timelineMinWidth),
                proposedTickWidth     = Math.floor(proposedScheduleWidth / ticksAmount),
                normalRegionWidth     = proposedTickWidth * ticksAmount,
                lockedRegionWidth     = horizontalPages * paperWidth - normalRegionWidth - 5, // 5 - splitter width
                columnsNumber         = 4,
                columnWidth           = Math.floor(lockedRegionWidth / columnsNumber),
                // Make header and footer to take as much space to leave only ROWSPERPAGE rows on each page
                headerHeight          = Math.floor((paperHeight - rowHeight * rowsPerPage) / 2);
    
            const columns = [
                { type : 'rownumber', id : 'rownumber', width : columnWidth, minWidth : columnWidth },
                {
                    id       : 'name',
                    field    : 'name',
                    width    : columnWidth,
                    minWidth : columnWidth,
                    headerRenderer({ headerElement }) {
                        headerElement.style.height = `${rowHeight - 1}px`;
                        return 'Name';
                    }
                },
                { text : 'First name', id : 'firstName', field : 'firstName', width : columnWidth, minWidth : columnWidth },
                { text : 'Surname', id : 'surName', field : 'surName', width : columnWidth, minWidth : columnWidth }
            ];
    
            const { resources, events, dependencies } = this.generateSingleRowHeightDataSet(verticalPages * rowsPerPage - 1, startDate, endDate);
    
            const features = Object.assign({
                pdfExport : {
                    exportServer : '/export',
                    headerTpl    : ({ currentPage }) => `<div style="height:${headerHeight}px;background-color: grey">
                    ${currentPage != null ? `Page ${currentPage}` : 'HEAD'}</div>`,
                    footerTpl : () => `<div style="height:${headerHeight}px;background-color: grey">FOOT</div>`
                }
            }, featuresConfig);
    
            const scheduler = new this.global.Scheduler({
                appendTo       : this.global.document.body,
                subGridConfigs : {
                    locked : {
                        width : Math.min(300, columnWidth * columnsNumber)
                    }
                },
                weekStartDay : 1,
                rowHeight    : rowHeight - 1,
                viewPreset   : {
                    name      : viewPreset,
                    tickWidth : proposedTickWidth
                },
                startDate,
                endDate,
                width,
                height,
                columns,
                features,
                resources,
                events,
                dependencies
            });
    
            return { scheduler, headerHeight, rowHeight, rowsPerPage, paperHeight, paperWidth };
        },
        
        getFirstLastVisibleTicks(doc, headerEl) {
            headerEl = headerEl || doc.querySelector('.b-sch-header-row.b-lowest ');
            
            const
                rectangle      = this.global.Rectangle,
                exportBodyEl   = doc.querySelector('.b-export-body'),
                exportBodyBox  = rectangle.from(exportBodyEl),
                timeAxisEl     = doc.querySelector('.b-grid-header-scroller-normal'),
                // header element might be moved outside of export body box with margin
                // and we only need left/right coordinates
                tmpBox         = rectangle.from(timeAxisEl),
                headerBox      = new rectangle(tmpBox.x, exportBodyBox.y, tmpBox.width, tmpBox.height).intersect(exportBodyBox),
                ticks          = Array.from(headerEl.querySelectorAll('.b-sch-header-timeaxis-cell'));
    
            let firstTick, lastTick;
    
            // Sort elements by tick index
            ticks.sort((el1, el2) => {
                const index1 = parseInt(el1.dataset.tickIndex);
                const index2 = parseInt(el2.dataset.tickIndex);
        
                return index1 - index2;
            });
    
            // in IE11 we cannot use getElementFromPoint, so instead we iterate over all tick elements and check
            // if we can find first/last visible
            ticks.forEach(tickEl => {
                let tickBox = rectangle.from(tickEl);
        
                if (!firstTick) {
                    if (tickBox.left <= headerBox.left && tickBox.right > headerBox.left) {
                        firstTick = tickEl;
                    }
                }
        
                if (!lastTick) {
                    if (tickBox.left < headerBox.right && tickBox.right >= headerBox.right) {
                        lastTick = tickEl;
                    }
                }
            });
            
            return { firstTick, lastTick };
        },
        
        // In order to work this requires `window.DEBUG = true;` to be set in the `StartTest` method
        getDateRangeFromExportedPage(doc) {
            const
                rectangle      = this.global.Rectangle,
                exportBodyEl   = doc.querySelector('.b-export-body'),
                exportBodyBox  = rectangle.from(exportBodyEl),
                headerEl       = doc.querySelector('.b-sch-timeaxiscolumn'),
                // header element might be moved outside of export body box with margin
                // and we only need left/right coordinates
                tmpBox         = rectangle.from(headerEl),
                headerBox      = new rectangle(tmpBox.x, exportBodyBox.y, tmpBox.width, tmpBox.height).intersect(exportBodyBox),
                bottomHeaderEl = doc.querySelector('.b-sch-header-row.b-lowest '),
                ticks          = Array.from(bottomHeaderEl.querySelectorAll('.b-sch-header-timeaxis-cell'));
    
            let firstTick, lastTick;
    
            // Sort elements by tick index
            ticks.sort((el1, el2) => {
                const index1 = parseInt(el1.dataset.tickIndex);
                const index2 = parseInt(el2.dataset.tickIndex);
        
                return index1 - index2;
            });
    
            ticks.forEach((tickEl, index) => {
                const tickBox = rectangle.from(tickEl);
        
                if (!firstTick && tickBox.right > headerBox.left) {
                    firstTick = tickEl;
                }
        
                if (!lastTick) {
                    if (index === ticks.length - 1 || tickBox.right >= headerBox.right) {
                        lastTick = tickEl;
                    }
                }
            });
    
            const
                startDate = new this.global.Date(parseInt(firstTick.dataset.date)),
                endDate   = new this.global.Date(parseInt(lastTick.dataset.date));
    
            return { startDate, endDate };
        },
        
        assertTicksExportedWithoutGaps(doc) {
            let rectangle  = this.global.Rectangle,
                headerRows = Array.from(doc.querySelectorAll('.b-sch-header-row')),
                headerEls  = Array.from(doc.querySelectorAll('.b-sch-header-row')),
                pass       = true;
    
            headerRows.forEach(headerRow => {
                const
                    position = headerRow.dataset.headerPosition,
                    tickEls = Array.from(headerRow.querySelectorAll('.b-sch-header-timeaxis-cell'));
        
                let prevRight, prevTickIndex;
        
                // Sort elements by tick index
                tickEls.sort((el1, el2) => {
                    const index1 = parseInt(el1.dataset.tickIndex);
                    const index2 = parseInt(el2.dataset.tickIndex);
            
                    if (index1 < index2) {
                        return -1;
                    }
                    else if (index1 === index2) {
                        return 0;
                    }
                    else {
                        return 1;
                    }
                });
        
                tickEls.forEach((tickEl, index) => {
                    const
                        elBox = rectangle.from(tickEl),
                        tickIndex = parseInt(tickEl.dataset.tickIndex);
            
                    if (index === 0) {
                        prevRight = elBox.right;
                        prevTickIndex = tickIndex;
                    }
                    else {
                        if (Math.abs(tickEl.left - prevRight) > 1) {
                            this.fail(`Tick ${index} in header ${position} is not aligned with previous one`, {
                                got  : elBox.left,
                                need : prevRight
                            });
                    
                            pass = false;
                        }
                
                        if (tickIndex !== prevTickIndex + 1) {
                            this.fail(`Unexpected tick index in header ${position}, got ${tickIndex} need ${prevTickIndex + 1}`);
                            pass = false;
                        }
                
                        prevRight = tickEl.left;
                        prevTickIndex = tickIndex;
                    }
                });
            });
    
            headerEls.forEach(headerEl => {
                let position  = headerEl.dataset.headerPosition,
                    firstTick, lastTick;
                
                ({ firstTick, lastTick } = this.getFirstLastVisibleTicks(doc, headerEl));
    
                if (!firstTick) {
                    this.fail(`Time axis cell element wasn't found at the beginning of header ${position}`);
                    pass = false;
                }
        
                if (!lastTick) {
                    this.fail(`Time axis cell element wasn't found at the end of header ${position}`);
                    pass = false;
                }
            });
    
            return pass;
        },
        
        isExportedTickCount(doc, count) {
            this.is(doc.querySelectorAll('.b-lowest .b-sch-header-timeaxis-cell').length, count, 'Ticks count is ok');
        },
        
        assertExportedEventsList(doc, events = []) {
            let pass          = true,
                rectangle     = this.global.Rectangle,
                exportBodyEl  = doc.querySelector(this.bowser.msie ? '.b-export-viewport' : '.b-export-body'),
                exportBodyBox = rectangle.from(exportBodyEl);
    
            events.forEach(event => {
                const eventElement = doc.querySelector(`[data-event-id="${event.id}"]`);
        
                if (!eventElement) {
                    this.fail(`Element is not found for event ${event.id}`);
                    pass = false;
                }
                else {
                    const eventBox = rectangle.from(eventElement);
            
                    if (!eventBox.intersect(exportBodyBox)) {
                        this.fail(`Event ${event.id} is not visible in the current view`, {
                            got      : eventBox,
                            need     : exportBodyBox,
                            gotDesc  : 'Event rectangle',
                            needDesc : 'Body rectangle'
                        });
                        pass = false;
                    }
            
                    const
                        resourceEl = doc.querySelector(`.b-timeline-subgrid .b-grid-row[data-id="${event.resourceId}"]`),
                        resourceBox = rectangle.from(resourceEl);
            
                    if (resourceBox.intersect(eventBox).height !== eventBox.height) {
                        this.fail(`Event ${event.id} is not aligned to its resource ${event.resourceId}`, {
                            got      : eventBox,
                            need     : resourceBox,
                            gotDesc  : 'Event rectangle',
                            needDesc : 'Resource rectangle'
                        });
                    }
                }
            });
    
            return pass;
        },
        
        assertExportedEventDependenciesList(doc, dependencies = [], arrowMargin = 12) {
            let pass = true;
    
            function getPointFromBox(el, side) {
                let fromPoint,
                    adjustLeft  = 0,
                    adjustRight = 0,
                    box         = el.getBoundingClientRect();
        
                switch (side) {
                    case 'top'    :
                        fromPoint = [box.left + box.width / 2, box.top];
                        break;
                    case 'bottom' :
                        fromPoint = [box.left + box.width / 2, box.bottom];
                        break;
                    case 'left'   :
                        fromPoint = [box.left - adjustLeft, box.top + box.height / 2];
                        break;
                    case 'right'  :
                        fromPoint = [box.right + adjustRight, box.top + box.height / 2];
                        break;
                }
        
                return fromPoint;
            }
    
            function getFromSide(dependency) {
                return dependency.fromSide || (dependency.type < 2 ? 'left' : 'right');
            }
    
            function getToSide(dependency) {
                return dependency.toSide || (dependency.type % 2 ? 'right' : 'left');
            }
    
            function getDependencyCoordinates(dependency, dependencyEl, fromEl, toEl, scale) {
                let svgBox           = dependencyEl.ownerSVGElement.getBoundingClientRect(),
                    dependencyPoints = dependencyEl.getAttribute('points').split(' '),
                    depStartPoint    = dependencyPoints[0].split(',').map(item => parseInt(item)),
                    depEndPoint      = dependencyPoints[dependencyPoints.length - 1].split(',').map(item => parseInt(item)),
                    depFromPoint     = [depStartPoint[0] * scale + svgBox.left, depStartPoint[1] * scale + svgBox.top],
                    depToPoint       = [depEndPoint[0] * scale + svgBox.left, depEndPoint[1] * scale + svgBox.top],
                    fromPoint, toPoint;
        
                fromPoint = fromEl && getPointFromBox(fromEl, getFromSide(dependency), fromEl.classList.contains('b-milestone-wrap'));
                toPoint = toEl && getPointFromBox(toEl, getToSide(dependency), toEl.classList.contains('b-milestone-wrap'));
        
                return { depFromPoint, depToPoint, fromPoint, toPoint };
            }
            
            function getScale(el) {
                return el.getBoundingClientRect().width / el.offsetWidth;
            }
    
            dependencies.forEach(dep => {
                // Firefox is case sensitive, has to be `depid` not `depId`
                const depElement = doc.querySelector(`[depid="${dep.id}"]`);
        
                if (!depElement) {
                    this.fail(`Element is not found for dependency ${dep.id}`);
                    pass = false;
                }
                else {
                    const
                        sourceEl       = doc.querySelector(`[data-event-id="${dep.from}"]`),
                        targetEl       = doc.querySelector(`[data-event-id="${dep.to}"]`),
                        scale          = getScale(sourceEl || targetEl);
            
                    let { depFromPoint, depToPoint, fromPoint, toPoint } = getDependencyCoordinates(dep, depElement, sourceEl, targetEl, scale);
            
                    if (fromPoint) {
                        if (Math.abs(depFromPoint[0] - fromPoint[0]) > 1) {
                            this.fail(`Dependency ${dep.id} start point x is ok`, {
                                got  : depFromPoint[0],
                                need : fromPoint[0]
                            });
                            pass = false;
                        }
                
                        if (Math.abs(depFromPoint[1] - fromPoint[1]) > 1) {
                            this.fail(`Dependency ${dep.id} start point y is ok`, {
                                got  : depFromPoint[1],
                                need : fromPoint[1]
                            });
                            pass = false;
                        }
                    }
            
                    if (toPoint) {
                        if (Math.abs(depToPoint[0] - toPoint[0]) > 1) {
                            this.fail(`Dependency ${dep.id} end point x is ok`, {
                                got  : depToPoint[0],
                                need : toPoint[0]
                            });
                            pass = false;
                        }
                
                        if (Math.abs(depToPoint[1] - toPoint[1]) > 1) {
                            this.fail(`Dependency ${dep.id} end point y is ok`, {
                                got  : depToPoint[1],
                                need : toPoint[1]
                            });
                            pass = false;
                        }
                    }
                }
            });
    
            return pass;
        }
        
        //endregion
    }
});

// Override so that when we run grid tests over here in Scheduler, we run them on an instance of Scheduler
var getScheduler = BryntumSchedulerTest.prototype.getScheduler; // eslint-disable-line no-undef
BryntumSchedulerTest.prototype._getGrid = BryntumGridTest.prototype.getGrid; // eslint-disable-line no-undef
BryntumSchedulerTest.prototype.getGrid = function(cfg) { // eslint-disable-line no-undef
    if (!cfg.appendTo) {
        cfg.appendTo = this.scopeProvider.iframe.contentDocument.body;
    }
    return getScheduler.call(this, cfg);
};
