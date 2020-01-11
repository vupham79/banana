/*KEEP*/import { Grid } from '../../../Grid/build/grid.module.js?437987';
/*KEEP*/import { Scheduler } from '../../../Scheduler/build/scheduler.module.js?437987';
/*KEEP*/import { Gantt } from '../../build/gantt.module.js?437987';

// NOTE: Any changes here should also be applied to grid-and-scheduler-module-online.t.js

StartTest(t => {
    t.ok(Grid, 'Grid available');
    t.ok(Scheduler, 'Scheduler available');
    t.ok(Gantt, 'Gantt available');

    new Grid({
        appendTo : document.body,
        id       : 'grid',
        width    : 1024,
        height   : 300,
        columns  : [
            { field : 'name', text : 'Name' }
        ],
        data : [
            { name : 'Mr Fantastic' }
        ]
    });

    new Scheduler({
        appendTo  : document.body,
        id        : 'scheduler',
        width     : 1024,
        height    : 300,
        resources : [
            { id : 1, name : 'The Thing' }
        ],
        startDate : new Date(2019, 4, 1),
        endDate   : new Date(2019, 4, 31),
        events    : [
            { resourceId : 1, startDate : new Date(2019, 4, 21), duration : 2 }
        ]
    });

    new Gantt({
        appendTo : document.body,
        id       : 'gantt',
        width    : 1024,
        height   : 300
    });

    t.selectorExists('.b-grid#grid', 'Grid element found');
    t.selectorExists('.b-scheduler#scheduler', 'Scheduler element found');
    t.selectorExists('.b-gantt#gantt', 'Gantt element found');

    t.selectorCountIs('.b-float-root', 1, 'Single float root');

    t.notOk('BUNDLE_EXCEPTION' in window, 'No exception from including both');
});
