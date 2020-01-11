<!--
/**
 * cSpell: ignore divs, unassign
 */
-->
<template>
    <div class = "b-gantt-container"></div>
</template>

<script>
    import { Gantt } from 'bryntum-gantt';

    // Defines a Vue component that wraps Bryntum Gantt
    export default {

        name : 'gantt',

        props : {
            // Configs
            autoHeight               : Boolean,
            barMargin                : {
                default : 10,
                type    : Number
            },
            calendars                : Array,
            cls                      : String,
            columnLines              : Boolean,
            columns                  : Array,
            data                     : Object,
            durationDisplayPrecision : [Number, Boolean],
            emptyText                : String,
            endDate                  : [String, Date],
            eventColor               : {
                default : 'green',
                type    : String
            },
            eventStyle               : {
                default : 'plain',
                type    : String
            },
            fillLastColumn           : Boolean,
            ganttId                  : String,
            height                   : [Number, String],
            minWidth                 : [Number, String],
            minHeight                : [Number, String],
            project                  : Object,
            readOnly                 : Boolean,
            snap                     : Boolean,
            startDate                : [String, Date],
            displayDateFormat        : String,
            flex                     : String,
            listeners                : Object,
            maxHeight                : [Number, String],
            maxWidth                 : [Number, String],
            maxZoomLevel             : Number,
            minZoomLevel             : Number,
            partner                  : [Object, String],
            resourceTimeRanges       : Array,
            taskRenderer             : Function,
            scrollLeft               : Number,
            scrollTop                : Number,
            selectedEvents           : Array,
            tickWidth                : Number,
            timeResolution           : Object,
            viewportCenterDate       : Date,
            width                    : [Number, String],
            zoomLevel                : Number,

            // Stores
            assignmentStore : Object,
            dependencyStore : Object,
            eventStore      : Object,
            taskStore       : Object,
            resourceStore   : Object,

            crudManager : Object,

            // Data
            assignments  : Array,
            dependencies : Array,
            events       : Array,
            tasks        : Array,
            resources    : Array,
            timeRanges   : Array,

            config : Object,

            // Features, only used for initialization
            cellEditFeature           : { type : [Boolean, Object], default : true },
            cellTooltipFeature        : [Boolean, Object],
            columnDragToolbarFeature  : [Boolean, Object],
            columnPickerFeature       : [Boolean, Object],
            columnReorderFeature      : [Boolean, Object],
            columnResizeFeature       : [Boolean, Object],
            contextMenuFeature        : [Boolean, Object],
            filterBarFeature          : [Boolean, Object],
            filterFeature             : [Boolean, Object],
            groupFeature              : [Boolean, Object, String],
            groupSummaryFeature       : [Boolean, Object],
            headerContextMenuFeature  : { type : [Boolean, Object], default : true },
            headerZoomFeature         : Boolean,
            labelsFeature             : [Boolean, Object],
            nonWorkingTimeFeature     : { type : [Boolean, Object], default : true },
            panFeature                : [Boolean, Object],
            pdfExportFeature          : [Boolean, Object],
            percentBarFeature         : [Boolean, Object],
            projectLinesBarFeature    : [Boolean, Object],
            quickFindFeature          : [Boolean, Object],
            regionResizeFeature       : Boolean,
            resourceTimeRangesFeature : [Boolean, Object],
            rowReorderFeature         : { type : Boolean, default : true },
            searchFeature             : [Boolean, Object],
            sortFeature               : [Boolean, Object, String, Array],
            stripeFeature             : Boolean,
            summaryFeature            : [Boolean, Object],
            taskContextMenuFeature    : [Boolean, Object],
            taskDragFeature           : [Boolean, Object],
            taskDragCreateFeature     : [Boolean, Object],
            taskEditFeature           : [Boolean, Object],
            taskResizeFeature         : [Boolean, Object],
            taskTooltipFeature        : [Boolean, Object],
            timeRangesFeature         : { type : [Boolean, Object], default : true },
            treeFeature               : { type : [Boolean, Object], default : true }
        }, // eo props

        // runs after the component is attached to DOM (mounted)
        mounted() {
            const propKeys = Object.keys(this.$props);

            const config = {
                // Render grid to components element
                appendTo : this.$el,

                // Listeners, will relay events using $emit
                listeners : {
                    catchAll(event) {
                        // Uncomment this line to log events being emitted to console
                        //console.log(event.type);
                        this.$emit(event.type, event);
                    },

                    thisObj : this
                },

                features : {}
            };

            // Apply all props to grid config
            propKeys.forEach(prop => {
                let match;
                if ((match = prop.match(/(.*)Feature/))) {
                    // Prop which ends with Feature is a feature config
                    config.features[match[1]] = this[prop];
                }
                else if (prop === 'config') {
                    // Prop is a config object
                    Object.assign(config, this[prop]);
                }
                else {
                    // Prop is a config
                    if (this[prop] !== undefined) config[prop] = this[prop];

                    // Set up a watcher
                    this.$watch(prop, newValue => {
                        this.ganttEngine[prop] = Array.isArray(newValue) ? newValue.slice() : newValue;
                    });
                }
            }, this);

            //console.log('config=', config, 'props=', this.$props);

            // Create a Bryntum Gantt with props as configs
            const engine = this.ganttEngine = new Gantt(config);

            engine.eventStore && engine.eventStore.relayAll(engine, 'events');
            engine.taskStore && engine.eventStore.relayAll(engine, 'tasks');
            engine.resourceStore && engine.resourceStore.relayAll(engine, 'resources');
            engine.assignmentStore && engine.assignmentStore.relayAll(engine, 'assignments');
            engine.dependencyStore && engine.dependencyStore.relayAll(engine, 'dependencies');

        }, // eo function mounted

        // cleanup before destroy
        beforeDestroy() {
            // Make sure Bryntum Grid is destroyed when vue component is
            this.ganttEngine.destroy();
        } // eo function beforeDestroy

    }; // eo gantt export

</script>

<!-- eof -->
