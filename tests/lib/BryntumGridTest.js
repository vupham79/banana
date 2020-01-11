Class('BryntumGridTest', {

    // eslint-disable-next-line no-undef
    isa : BryntumCoreTest,

    override : {
        earlySetup(callback, errback) {
            // Reset theme and language for demo tests
            if (this.url.indexOf('/examples') > -1) {
                localStorage.removeItem('exampleLanguage');
                localStorage.removeItem('bryntumExampleTheme');
            }

            this.SUPER(callback, errback);
        }
    },

    methods : {
        getRemoteGrid(cfg) {
            const
                me        = this,
                url       = me.url + '/' + me.generation,
                generator = me.global.DataGenerator;

            generator && generator.reset();

            cfg = cfg || {};

            cfg.store = {
                fields   : [{
                    name       : 'fullName',
                    dataSource : 'name'
                }, {
                    name       : 'ageInYears',
                    dataSource : 'age'
                }, {
                    name       : 'town',
                    dataSource : 'city'
                }, {
                    name       : 'favouriteFood',
                    dataSource : 'food'
                }, {
                    name       : 'favouriteColor',
                    dataSource : 'color'
                }, {
                    name       : 'codingScore',
                    dataSource : 'score'
                }, {
                    name       : 'codingRank',
                    dataSource : 'rank'
                }, {
                    name       : 'codingPercent',
                    dataSource : 'percent'
                }, {
                    name       : 'startDate',
                    dataSource : 'start',
                    type       : 'date'
                }],
                readUrl  : url,
                autoLoad : true
            };

            me.mockUrl(url, {
                synchronous  : true,
                responseText : JSON.stringify(cfg.data || generator.generateData(cfg.count || 25))
            });

            if (!cfg.columns) {
                cfg.columns = [{
                    text    : 'Name',
                    field   : 'fullName',
                    width   : 150,
                    editor  : 'text',
                    cellCls : 'name'
                }, {
                    text       : 'Age',
                    field      : 'ageInYears',
                    width      : 100,
                    editor     : 'number',
                    cellCls    : 'age',
                    filterType : 'number'
                }, {
                    text    : 'City',
                    field   : 'town',
                    flex    : 2,
                    editor  : false,
                    cellCls : 'city'
                }, {
                    text    : 'Food',
                    field   : 'favouriteFood',
                    flex    : 1,
                    cellCls : 'food'
                }, {
                    text    : 'Color',
                    field   : 'favouriteColor',
                    flex    : 1,
                    editor  : {
                        type  : 'combo',
                        items : generator ? generator.colors : []
                    },
                    cellCls : 'color'
                }, {    // initially hidden column must not be navigated to by tests
                    text   : 'Start Date',
                    type   : 'date',
                    field  : 'startDate',
                    hidden : true
                }];
            }

            if (cfg.extraColumns) {
                cfg.columns.push.apply(cfg.columns, cfg.extraColumns);
            }

            return me.getGrid(cfg);
        },

        getGrid(cfg) {
            if (!cfg) cfg = {};

            const generator = this.global.DataGenerator;

            generator && generator.reset();

            if (generator && !cfg.data && !cfg.store) {
                cfg.data = generator.generateData(cfg.count || 25, cfg.randomHeight);
            }

            if (generator && cfg.store && !cfg.store.data && !cfg.store.readUrl) {
                cfg.store.data = generator.generateData(cfg.count || 25, cfg.randomHeight);
            }

            if (!cfg.columns) {
                cfg.columns = [
                    { text : 'Name', field : 'name', width : 150, editor : 'text', cellCls : 'name' },
                    { text : 'Age', field : 'age', width : 100, editor : 'number', cellCls : 'age' },
                    { text : 'City', field : 'city', flex : 2, editor : false, cellCls : 'city' },
                    { text : 'Food', field : 'food', flex : 1, cellCls : 'food' },
                    {
                        text    : 'Color',
                        field   : 'color',
                        flex    : 1,
                        editor  : { type : 'combo', items : generator ? generator.colors : [] },
                        cellCls : 'color'
                    }
                ];
            }

            if (cfg.rowNumber) {
                cfg.columns.unshift({ type : 'rownumber' });
            }

            if (!cfg.appendTo) {
                cfg.appendTo = this.global.document.body;
            }
            const grid = new this.global.Grid(cfg);
            if (grid.isVisible && cfg.sanityCheck !== false) {
                this.checkGridSanity(grid);
            }
            return grid;
        },

        getTree(cfg) {
            if (!cfg) cfg = {};

            cfg.features = cfg.features || {};

            cfg.features.tree = cfg.features.tree || true;

            if (!cfg.data && !cfg.store) {
                cfg.data = [
                    {
                        'id'          : 1000,
                        'StartDate'   : '2018-01-16',
                        'Name'        : 'Project A',
                        'Description' : 'Project A description',
                        'PercentDone' : 50,
                        'Duration'    : 20,
                        'expanded'    : true,
                        'children'    : [
                            {
                                'id'          : 1,
                                'Name'        : 'Planning',
                                'PercentDone' : 50,
                                'StartDate'   : '2018-01-16',
                                'Duration'    : 10,
                                'expanded'    : true,
                                'children'    : [
                                    {
                                        'id'          : 11,
                                        'leaf'        : true,
                                        'Name'        : 'Investigate',
                                        'PercentDone' : 50,
                                        'StartDate'   : '2018-01-16',
                                        'Duration'    : 8
                                    },
                                    {
                                        'id'          : 12,
                                        'leaf'        : true,
                                        'Name'        : 'Assign resources',
                                        'PercentDone' : 50,
                                        'StartDate'   : '2018-01-16',
                                        'Duration'    : 10
                                    },
                                    {
                                        'id'          : 13,
                                        'leaf'        : true,
                                        'Name'        : 'Gather documents',
                                        'PercentDone' : 50,
                                        'StartDate'   : '2018-01-16',
                                        'Duration'    : 10
                                    },
                                    {
                                        'id'          : 17,
                                        'leaf'        : true,
                                        'Name'        : 'Report to management',
                                        'PercentDone' : 0,
                                        'StartDate'   : '2018-01-28',
                                        'Duration'    : 0
                                    }
                                ]
                            },
                            {
                                'id'          : 4,
                                'Name'        : 'Implementation Phase',
                                'PercentDone' : 45,
                                'StartDate'   : '2018-01-30',
                                'Duration'    : 10,
                                'expanded'    : true,
                                'children'    : [
                                    {
                                        'id'          : 34,
                                        'leaf'        : true,
                                        'Name'        : 'Preparation work',
                                        'PercentDone' : 30,
                                        'StartDate'   : '2018-01-30',
                                        'Duration'    : 5
                                    },
                                    {
                                        'id'          : 16,
                                        'leaf'        : true,
                                        'Name'        : 'Choose technology suite',
                                        'PercentDone' : 30,
                                        'StartDate'   : '2018-01-30',
                                        'Duration'    : 5
                                    },
                                    {
                                        'id'          : 15,
                                        'Name'        : 'Build prototype',
                                        'PercentDone' : 60,
                                        'StartDate'   : '2018-02-06',
                                        'Duration'    : 5,
                                        'expanded'    : false,
                                        'children'    : [
                                            {
                                                'id'          : 20,
                                                'leaf'        : true,
                                                'Name'        : 'Step 1',
                                                'PercentDone' : 60,
                                                'StartDate'   : '2018-02-06',
                                                'Duration'    : 4
                                            },
                                            {
                                                'id'          : 19,
                                                'leaf'        : true,
                                                'Name'        : 'Step 2',
                                                'PercentDone' : 60,
                                                'StartDate'   : '2018-02-06',
                                                'Duration'    : 4
                                            },
                                            {
                                                'id'          : 18,
                                                'leaf'        : true,
                                                'Name'        : 'Step 3',
                                                'PercentDone' : 60,
                                                'StartDate'   : '2018-02-06',
                                                'Duration'    : 4
                                            },
                                            {
                                                'id'          : 21,
                                                'leaf'        : true,
                                                'Name'        : 'Follow up with customer',
                                                'PercentDone' : 60,
                                                'StartDate'   : '2018-02-10',
                                                'Duration'    : 1
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                'id'          : 5,
                                'leaf'        : true,
                                'Name'        : 'Customer approval',
                                'PercentDone' : 0,
                                'StartDate'   : '2018-02-11',
                                'Duration'    : 0
                            }
                        ]
                    },
                    {
                        'id'          : 1001,
                        'StartDate'   : '2018-01-23',
                        'Name'        : 'Project B',
                        'Description' : 'Project B description goes here',
                        'PercentDone' : 35,
                        'Duration'    : 25,
                        'expanded'    : true,
                        'children'    : [
                            {
                                'id'          : 10,
                                'Name'        : 'Planning',
                                'PercentDone' : 50,
                                'StartDate'   : '2018-01-23',
                                'Duration'    : 10,
                                'expanded'    : true,
                                'children'    : [
                                    {
                                        'id'          : 110,
                                        'leaf'        : true,
                                        'Name'        : 'Investigate',
                                        'PercentDone' : 50,
                                        'StartDate'   : '2018-01-23',
                                        'Duration'    : 5
                                    },
                                    {
                                        'id'          : 120,
                                        'leaf'        : true,
                                        'Name'        : 'Assign resources',
                                        'PercentDone' : 50,
                                        'StartDate'   : '2018-01-23',
                                        'Duration'    : 10
                                    },
                                    {
                                        'id'          : 130,
                                        'leaf'        : true,
                                        'Name'        : 'Gather documents',
                                        'PercentDone' : 50,
                                        'StartDate'   : '2018-01-23',
                                        'Duration'    : 10
                                    },
                                    {
                                        'id'          : 170,
                                        'leaf'        : true,
                                        'Name'        : 'Report to management',
                                        'PercentDone' : 0,
                                        'StartDate'   : '2018-02-04',
                                        'Duration'    : 0
                                    }
                                ]
                            },
                            {
                                'id'          : 40,
                                'Name'        : 'Implementation Phase 1',
                                'PercentDone' : 40,
                                'StartDate'   : '2018-02-06',
                                'Duration'    : 6,
                                'expanded'    : false,
                                'children'    : [
                                    {
                                        'id'          : 340,
                                        'leaf'        : true,
                                        'Name'        : 'Preparation work',
                                        'PercentDone' : 30,
                                        'StartDate'   : '2018-02-06',
                                        'Duration'    : 5
                                    },
                                    {
                                        'id'          : 140,
                                        'leaf'        : true,
                                        'Name'        : 'Evaluate chipsets',
                                        'PercentDone' : 30,
                                        'StartDate'   : '2018-02-06',
                                        'Duration'    : 5
                                    },
                                    {
                                        'id'          : 160,
                                        'leaf'        : true,
                                        'Name'        : 'Choose technology suite',
                                        'PercentDone' : 30,
                                        'StartDate'   : '2018-02-06',
                                        'Duration'    : 5
                                    },
                                    {
                                        'id'          : 150,
                                        'Name'        : 'Build prototype',
                                        'PercentDone' : 60,
                                        'StartDate'   : '2018-02-07',
                                        'Duration'    : 5,
                                        'expanded'    : true,
                                        'children'    : [
                                            {
                                                'id'          : 200,
                                                'leaf'        : true,
                                                'Name'        : 'Step 1',
                                                'PercentDone' : 60,
                                                'StartDate'   : '2018-02-07',
                                                'Duration'    : 4
                                            },
                                            {
                                                'id'          : 190,
                                                'leaf'        : true,
                                                'Name'        : 'Step 2',
                                                'PercentDone' : 60,
                                                'StartDate'   : '2018-02-07',
                                                'Duration'    : 4
                                            },
                                            {
                                                'id'          : 180,
                                                'leaf'        : true,
                                                'Name'        : 'Step 3',
                                                'PercentDone' : 60,
                                                'StartDate'   : '2018-02-07',
                                                'Duration'    : 4
                                            },
                                            {
                                                'id'          : 210,
                                                'leaf'        : true,
                                                'Name'        : 'Follow up with customer',
                                                'PercentDone' : 60,
                                                'StartDate'   : '2018-02-13',
                                                'Duration'    : 1
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                'id'          : 50,
                                'leaf'        : true,
                                'Name'        : 'Customer approval',
                                'PercentDone' : 0,
                                'StartDate'   : '2018-02-14',
                                'Duration'    : 0
                            },
                            {
                                'id'          : 60,
                                'Name'        : 'Implementation Phase 2',
                                'PercentDone' : 15,
                                'StartDate'   : '2018-02-15',
                                'Duration'    : 8,
                                'expanded'    : false,
                                'children'    : [
                                    {
                                        'id'          : 250,
                                        'leaf'        : true,
                                        'Name'        : 'Task 1',
                                        'PercentDone' : 10,
                                        'StartDate'   : '2018-02-15',
                                        'Duration'    : 8
                                    },
                                    {
                                        'id'          : 260,
                                        'leaf'        : true,
                                        'Name'        : 'Task 2',
                                        'PercentDone' : 20,
                                        'StartDate'   : '2018-02-15',
                                        'Duration'    : 8
                                    },
                                    {
                                        'id'          : 270,
                                        'leaf'        : true,
                                        'Name'        : 'Task 3',
                                        'PercentDone' : 20,
                                        'StartDate'   : '2018-02-15',
                                        'Duration'    : 8
                                    }
                                ]
                            },
                            {
                                'id'          : 100,
                                'leaf'        : true,
                                'Name'        : 'Customer approval 2',
                                'PercentDone' : 0,
                                'StartDate'   : '2018-02-25',
                                'Duration'    : 0
                            }
                        ]
                    }
                ];
            }

            if (!cfg.columns) {
                cfg.columns = [
                    { text : 'Name', field : 'Name', width : 150, editor : 'text', cellCls : 'name', type : 'tree' },
                    { text : 'PercentDone', field : 'PercentDone', width : 100, editor : 'number', cellCls : 'age' },
                    { text : 'Date', field : 'StartDate', flex : 2, editor : false }
                ];
            }

            if (!cfg.appendTo) {
                cfg.appendTo = this.global.document.body;
            }
            return new this.global.TreeGrid(cfg);
        },

        checkGridSanity(grid) {
            const
                cols                   = grid.columns || grid._columnStore, // Fallback for IE, some transpilation problem
                columns                = cols.leaves.filter(col => !col.hidden),
                shrinkwrapGroupColumns = cols.allRecords.filter(c => c.children && !c.width && !c.flex && c.children.every(cc => cc.width)),
                columnCount            = columns.length,
                rows                   = grid.rowManager.rows,
                rowCount               = rows.length,
                headerEls              = [],
                footerEls              = [],
                IE11FlexRe             = /calc\((\d+)px - \d+px\)/;

            let i;

            for (i = 0; i < columnCount; i++) {
                headerEls[i] = grid.getHeaderElement(columns[i].id);
                footerEls[i] = grid.fromCache(`.b-grid-footer[data-column-id=${columns[i].id}]`);
            }

            for (i = 0; i < columnCount; i++) {
                const
                    headerEl     = headerEls[i],
                    footerEl     = footerEls[i],
                    column       = columns[i],
                    othersFlexed = grid.subGrids[column.region].columns.some(c => c !== column && !c.hidden && c.flex);

                // Allow width : '100px' as well as width : 100
                let w = column.width;
                if (w && w.endsWith && w.endsWith('px')) {
                    w = parseInt(w);
                }

                // Check that columns configured with flex are obeying both in header and in any footer
                if (column.flex) {
                    const domFlex = new RegExp(`^${column.flex} 1 0(?:px|%)$`);

                    if (headerEl && !domFlex.test(headerEl.style.flex)) {
                        this.fail(`Grid ${grid.id}, header[${i}] not flexed as configured`);
                    }
                    if (footerEl && !domFlex.test(footerEl.style.flex)) {
                        this.fail(`Grid ${grid.id}, footer[${i}] not flexed as configured`);
                    }
                }
                // Check that columns configured with a numeric width are obeying both in header and in any footer
                else if (typeof w === 'number') {
                    // Last column in a grid which is configured fillLastColumn : true is special
                    if (grid.fillLastColumn && column.isLastInSubGrid) {
                        // If there is flex in siblings, then this column won't need to to fill
                        // the grid, and it should attain its configured width
                        if (othersFlexed) {
                            if (headerEl && headerEl.offsetWidth !== w) {
                                this.fail(`Grid ${grid.id}, header[${i}] does not match its configured width`);
                            }
                            if (footerEl && this.isElementVisible(footerEl) && footerEl.offsetWidth !== w) {
                                this.fail(`Grid ${grid.id}, footer[${i}] does not match its configured width`);
                            }
                        }
                        // If there's no flex in siblings, we must have a flex-grow style in order to satisfy the fillLastColumn
                        else {
                            if (headerEl && isNaN(headerEl.ownerDocument.defaultView.getComputedStyle(headerEl).getPropertyValue('flex-grow'))) {
                                this.fail(`Grid ${grid.id}, header[${i}] should be flex:1 `);
                            }
                            if (footerEl && isNaN(headerEl.ownerDocument.defaultView.getComputedStyle(footerEl).getPropertyValue('flex-grow'))) {
                                this.fail(`Grid ${grid.id}, footer[${i}] should be flex:1 `);
                            }
                        }
                    }
                    else {
                        if (headerEl && headerEl.offsetWidth !== w) {
                            this.fail(`Grid ${grid.id}, header[${i}] does not match its configured width`);
                        }
                        if (footerEl && this.isElementVisible(footerEl) && footerEl.offsetWidth !== w) {
                            this.fail(`Grid ${grid.id}, footer[${i}] does not match its configured width`);
                        }
                    }
                }
            }

            // Check that group columns which have no flex and no width, who's children are all widthed
            // acquire the sum of the width of the children
            for (i = 0; i < shrinkwrapGroupColumns.length; i++) {
                const
                    el              = shrinkwrapGroupColumns[i].element,
                    column          = shrinkwrapGroupColumns[i],
                    childTotalWidth = column.children.reduce((result, col) => {
                        return (result += col.element.offsetWidth);
                    }, 0);

                if (el.offsetWidth !== childTotalWidth) {
                    this.fail(`Grid ${grid.id}, group header[${i}] does not shrinkwrap its widthed children`);
                }
            }

            if (!grid.hideHeaders) {
                for (i = 0; i < rowCount; i++) {
                    const row = rows[i];
                    for (let col = 0; col < columnCount; col++) {
                        const
                            columnId    = columns[col].id,
                            cell        = grid.getCell({ id : row.id, columnId }),
                            headerCell  = headerEls[col],
                            cellWidth   = cell.offsetWidth,
                            headerWidth = headerCell.offsetWidth;
                        let
                            headerStyleWidth = headerWidth;

                        // TODO: Remove this when IE11 retires.
                        // Get style width to be sure it was added to header's flexBasis (Grid/view/Bar.js)
                        // Actual width may differ so just check style value
                        if (this.browser.msie && headerCell.style.flexBasis) {
                            let reMatch;
                            if ((reMatch = headerCell.style.flexBasis.match(IE11FlexRe))) {
                                headerStyleWidth = parseInt(reMatch[1], 0);
                            }
                        }

                        const validDelta = this.browser.msie || this.browser.msedge ? 2 : 0;
                        if ((Math.abs(cellWidth - headerWidth) > validDelta) && cellWidth !== headerStyleWidth) {
                            this.fail(`Grid ${grid.id} offsetWidth: cell[row=${i},col=${col}] (${cellWidth}) != header[col=${col},id="${columnId}"] (${headerWidth})`);
                        }
                    }
                }
            }

            // Check post render height cache (Edge sometimes gives 1.2, but looks visually ok)
            // Scaling (The scaleToFitWidth config) causes this to fail in IE (Trident engine).
            if (!(navigator.userAgent.match(/trident/i) && grid.element.style.transform.indexOf('scale') > -1)) {
                const validDelta = this.browser.msie || this.browser.msedge ? 2 : 1.5;
                if (Math.abs(grid.bodyHeight - grid.bodyContainer.getBoundingClientRect().height) > validDelta) {
                    this.fail(`Grid ${grid.id} bodyHeight (${grid.bodyHeight}) != bodyContainer.offsetHeight (${grid.bodyContainer.getBoundingClientRect().height})`);
                }
            }
        },

        waitForCellEditing(grid, next) {
            var inputField;

            this.waitFor(function() {
                var editorContext = grid.features.cellEdit.editorContext;

                if (editorContext) {
                    inputField = editorContext.editor.inputField;

                    return editorContext.editor.containsFocus;
                }
            }, () => next(inputField));
        },

        waitForRowsVisible(grid, next) {
            if (typeof grid === 'function') {
                next = grid;
                grid = null;
            }
            const root = grid && grid.element || this.global.document.body;

            this.waitFor(function() {
                return root.querySelector('.b-grid-cell');
            }, next);
        },

        waitForGridEvent(object, event, next) {
            object.on({
                // When the event is fired, continue after a small delay.
                // This wait function is used to wait for async handling
                // to process events. There are often multiple consequences, so
                // it often needs a slight delay to allow the rest of the
                // async handling to complete before moving on to next step.
                [event] : () => setTimeout(next, 100),
                once    : true
            });
        },

        waitForGridEvents(list, next) {
            let counter = 0;
            const handler = () => (++counter === list.length) && next();

            list.forEach(([object, event]) => this.waitForGridEvent(object, event, handler));
        },

        getFirstRenderedRow(grid) {
            const
                root = grid && grid.element || this.global.document.body,
                rows = root.querySelectorAll('.b-grid-row');
            let y = Number.MAX_VALUE, row;

            [].forEach.call(rows, function(node) {
                const nodeY = node.getBoundingClientRect();

                if (nodeY.top < y) {
                    y = nodeY.top;
                    row = node;
                }
            });

            return row;
        },

        getLastRenderedRow(grid) {
            const
                root = grid && grid.element || this.global.document.body,
                rows = root.querySelectorAll('.b-grid-row');
            let y = -1, row;

            [].forEach.call(rows, function(node) {
                const nodeY = node.getBoundingClientRect();

                if (nodeY.top > y) {
                    y = nodeY.top;
                    row = node;
                }
            });

            return row;
        },
    
        //region EXPORT
    
        overrideAjaxHelper() {
            const me = this;
        
            class AjaxHelperOverride {
                static get target() {
                    return {
                        class : me.global.AjaxHelper
                    };
                }
            
                static fetch(url, params) {
                    if (/export/.test(url)) {
                        const body = JSON.parse(params.body);
                    
                        return new Promise(resolve => {
                            resolve({
                                ok      : true,
                                request : {
                                    params,
                                    body
                                },
                                json() {
                                    return Promise.resolve({});
                                },
                                parsedJson : {}
                            });
                        });
                    }
                    else {
                        return this._overridden.fetch(url, params);
                    }
                }
            }
            this.global.Override.apply(AjaxHelperOverride);
        },
    
        generateGridByPages({ rowsPerPage = 10, rowHeight = 50, verticalPages = 1, horizontalPages = 1 } = {}) {
            // Paper height in
            const
                paperHeight = this.global.PaperFormat.A4.height * 96,
                paperWidth  = this.global.PaperFormat.A4.width * 96,
                columnsNumber = 4,
                // Make columns wide enough to extend exported content to two columns
                columnWidth = Math.floor(paperWidth / columnsNumber) * horizontalPages,
                // Make header and footer to take as much space to leave only 10 rows on each page
                headerHeight = Math.floor((paperHeight - rowHeight * rowsPerPage) / 2);
        
            const grid = new this.global.Grid({
                appendTo  : this.global.document.body,
                width     : 500,
                height    : 300,
                rowHeight : rowHeight - 1, // including standard row border that would be even 50
                columns   : [
                    {
                        field : 'name',
                        width : columnWidth,
                        headerRenderer({ headerElement }) {
                            headerElement.style.height = `${rowHeight - 1}px`;
                            return 'Name';
                        }
                    },
                    { text : 'Age', field : 'age', width : columnWidth },
                    { text : 'Color', field : 'color', width : columnWidth },
                    { text : 'City', field : 'city', width : columnWidth }
                ],
                data     : this.global.DataGenerator.generateData(verticalPages * rowsPerPage - 1), // header is as high as row and exported too
                features : {
                    pdfExport : {
                        exportServer : '/export',
                        headerTpl    : () => `<div style="height:${headerHeight}px;background-color: grey">HEAD</div>`,
                        footerTpl    : () => `<div style="height:${headerHeight}px;background-color: grey">FOOT</div>`
                    }
                }
            });
        
            return { grid, paperHeight, paperWidth, columnWidth, headerHeight, rowHeight };
        },
        
        async getExportHtml(grid, exportConfig) {
            // Using '_features' instead of 'features' for IE11 compatibility
            const result = await grid._features.pdfExport.export(exportConfig);
            
            return result.response.request.body.html;
        },
    
        assertHeaderPosition(doc) {
            let contentElBox = doc.querySelector('.b-export-content').getBoundingClientRect(),
                headerElBox  = doc.querySelector('.b-export-header').getBoundingClientRect(),
                pass         = true;
        
            if (headerElBox.top !== 0) {
                this.fail('Header el is aligned with page top', {
                    got  : headerElBox.top,
                    need : 0
                });
                pass = false;
            }
        
            if (headerElBox.width !== contentElBox.width) {
                this.fail('Header el width is ok', {
                    got  : headerElBox.width,
                    need : contentElBox.width
                });
                pass = false;
            }
        
            return pass;
        },
    
        assertFooterPosition(doc) {
            let contentElBox = doc.querySelector('.b-export-content').getBoundingClientRect(),
                footerElBox  = doc.querySelector('.b-export-footer').getBoundingClientRect(),
                pass         = true,
                bodyBottom   = doc.body.getBoundingClientRect().bottom;
        
            if (Math.abs(footerElBox.bottom - bodyBottom) > 1) {
                this.fail('Footer el is aligned with page bottom', {
                    got  : footerElBox.bottom,
                    need : bodyBottom
                });
                pass = false;
            }
        
            if (footerElBox.width !== contentElBox.width) {
                this.fail('Footer el width is ok', {
                    got  : footerElBox.width,
                    need : contentElBox.width
                });
                pass = false;
            }
        
            return pass;
        },
    
        assertRowsExportedWithoutGaps(doc, assertStartsWithRow = false, assertEndsWithRow = false) {
            let headerElBox  = doc.querySelector('.b-export-header').getBoundingClientRect(),
                regions      = Array.from(doc.querySelectorAll('.b-grid-subgrid')),
                pass         = true;
        
            regions.forEach(regionEl => {
                const
                    name = regionEl.dataset.region,
                    rows = Array.from(regionEl.querySelectorAll('.b-grid-row'));
            
                let previousRowBottom;
            
                rows.forEach((rowEl, index) => {
                    const rowElBox = rowEl.getBoundingClientRect();
                
                    if (index === 0) {
                        previousRowBottom = rowElBox.bottom;
                    
                        if (assertStartsWithRow) {
                            if (!(rowElBox.top <= headerElBox.bottom && rowElBox.bottom >= headerElBox.bottom)) {
                                this.fail('Gap found between first row on the page and page header', {
                                    got      : [rowElBox.top, rowElBox.bottom],
                                    gotDesc  : 'Row [top, bottom]',
                                    need     : headerElBox.bottom,
                                    needDesc : 'Header bottom'
                                });
                            
                                pass = false;
                            }
                        }
                    }
                    else {
                        // Firefox requires bigger threshold
                        if (rowElBox.top - previousRowBottom > 0.5) {
                            this.fail(`Row ${index} is not aligned with previous row in ${name} subgrid`, {
                                got  : rowElBox.top,
                                need : previousRowBottom
                            });
                        
                            pass = false;
                        }
                    
                        previousRowBottom = rowElBox.bottom;
                    
                        if (index === rows.length - 1) {
                            if (assertEndsWithRow) {
                                const footerElBox = doc.querySelector('.b-export-footer').getBoundingClientRect();
                            
                                if (!(Math.round(rowElBox.bottom) >= Math.round(footerElBox.top))) {
                                    this.fail('Gap found between last row on the page and page footer', {
                                        got      : rowElBox.bottom,
                                        need     : footerElBox.top,
                                        needDesc : 'Need greater or equal to'
                                    });
                                
                                    pass = false;
                                }
                            }
                        
                            const gridBox = doc.querySelector('.b-gridbase').getBoundingClientRect();
                        
                            // Use round because we are dealing with fractions of pixels
                            // 1px approximation for FF
                            if (Math.round(gridBox.bottom) + 1 < Math.round(rowElBox.bottom)) {
                                this.fail('Last row element is not fully visible', {
                                    got      : gridBox.bottom,
                                    need     : rowElBox.bottom,
                                    gotDesc  : 'Grid element ends at',
                                    needDesc : 'Row element ends at'
                                });
                            
                                pass = false;
                            }
                        }
                    }
                });
            });
        
            return pass;
        }
    
        //endregion
    }
});
