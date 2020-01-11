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

const gantt = new Gantt({
    adopt : 'container',

    project,

    columns : [
        { type : 'wbs' },
        { type : 'name', field : 'name', width : 250 },
        { type : 'startdate' },
        { type : 'enddate' },
        { type : 'duration' }
    ]
});

project.load();
