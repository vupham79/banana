import { Gantt, ProjectModel } from '../../build/gantt.module.js?437987';
import shared from '../_shared/shared.module.js?437987';
/* eslint-disable no-unused-vars */

const project = new ProjectModel({
    transport : {
        load : {
            url : '../_datasets/launch-saas.json'
        }
    }
});

new Gantt({
    adopt : 'container',

    project : project,

    columns : [
        { type : 'name', field : 'name', width : 250 }
    ],

    // Custom task content, display task name on child tasks
    taskRenderer({ taskRecord }) {
        if (taskRecord.isLeaf && !taskRecord.isMilestone) {
            return taskRecord.name;
        }
    }
});

project.load();
