import { Gantt, ProjectModel, WidgetHelper } from '../../build/gantt.module.js?437987';
import shared from '../_shared/shared.module.js?437987';
/* eslint-disable no-unused-vars */

const project = window.project = new ProjectModel({
    transport : {
        load : {
            url : 'data/tasks.json'
        }
    }
});

const gantt = new Gantt({
    adopt : 'container',

    project : project,

    columns : [
        { type : 'wbs' },
        { type : 'name' }
    ],

    subGridConfigs : {
        locked : {
            flex : 1
        },
        normal : {
            flex : 2
        }
    },

    viewPreset : 'monthAndYear',

    // Allow extra space for rollups
    rowHeight : 50,
    barMargin : 7,

    columnLines : true,

    features : {
        rollups : true
    }
});

WidgetHelper.append([
    {
        cls        : 'b-blue b-bright',
        type       : 'checkbox',
        text       : 'Show Rollups',
        checked    : true,
        toggleable : true,
        onAction({ checked }) {
            gantt.features.rollups.disabled = !checked;
        }
    }
], {
    insertFirst : document.getElementById('tools') || document.body
});

project.load();
