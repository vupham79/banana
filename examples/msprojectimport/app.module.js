import { StringHelper, Gantt, ProjectModel, WidgetHelper, AjaxHelper, Toast } from '../../build/gantt.module.js?437987';
import shared from '../_shared/shared.module.js?437987';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function lowerCaseConfig(data) {
    const config = {};
    
    Object.keys(data).forEach(key => {
        config[StringHelper.lowercaseFirstLetter(key)] = data[key];
    });
    
    return config;
}

class Importer {
    constructor(project) {
        const me = this;
        
        Object.assign(me, {
            project,
            taskStore       : project.taskStore,
            dependencyStore : project.dependencyStore,
            resourceStore   : project.resourceStore,
            assignmentStore : project.assignmentStore,
            calendarManager : project.calendarManagerStore
        });
    }
    
    importData(data) {
        const me = this;
        
        Object.assign(me, {
            calendarMap     : {},
            projectCalendar : null,
            resourceMap     : {},
            taskMap         : {}
        });
        
        me.calendarManager.rootNode = me.processCalendars(data);
    
        const tasks = me.getTaskTree(Array.isArray(data.tasks) ? data.tasks : [data.tasks]);
    
        me.resourceStore.data = me.processResources(data);
        me.dependencyStore.data = me.processDependencies(data);
    
        // set project calendar if it's provided
        // we set project calendar in silent mode to not readjust all the tasks
        if (me.projectCalendar) {
            me.project.calendar = me.calendarMap[me.projectCalendar];
        }
        
        me.taskStore.rootNode.clearChildren();
        me.taskStore.rootNode.appendChild(tasks[0].children);
    
        // have to process assigments only after new project calendar is set
        me.assignmentStore.data = me.processAssignments(data);
    }
    
    // region RESOURCES
    processResources(data) {
        return data.resources.map(this.processResource, this);
    }
    
    processResource(data) {
        const id = data.Id;
        delete data.Id;
        
        data.calendar = this.calendarMap[data.Calendar];
        
        const resource = new this.resourceStore.modelClass(lowerCaseConfig(data));
        
        this.resourceMap[id] = resource;
        return resource;
    }
    // endregion
    
    // region DEPENDENCIES
    processDependencies(data) {
        return data.dependencies.map(this.processDependency, this);
    }
    
    processDependency(data) {
        const
            me     = this,
            fromId = data.From,
            toId   = data.To;
    
        delete data.From;
        delete data.To;
        delete data.Id;
        
        const dep = new me.dependencyStore.modelClass(lowerCaseConfig(data));
        
        dep.fromEvent = me.taskMap[fromId].id;
        dep.toEvent = me.taskMap[toId].id;
        
        return dep;
    }
    // endregion
    
    // region ASSIGNMENTS
    processAssignments(data) {
        return data.assignments.map(this.processAssignment, this);
    }
    
    processAssignment(data) {
        const
            me          = this,
            resourceId  = data.ResourceId,
            taskId      = data.TaskId;
        
        delete data.Id;
        delete data.ResourceId;
        delete data.TaskId;
        
        return new me.assignmentStore.modelClass({
            units    : data.Units,
            event    : me.taskMap[taskId],
            resource : me.taskMap[resourceId]
        });
    }
    // endregion
    
    // region TASKS
    getTaskTree(tasks) {
        return tasks.map(this.processTask, this);
    }
    
    processTask(data) {
        const
            me = this,
            id = data.Id,
            children = data.children;
        
        delete data.children;
        delete data.Id;
        delete data.Milestone;
        
        data.calendar = me.calendarMap[data.calendar];
        
        const t = new me.taskStore.modelClass(lowerCaseConfig(data));
        
        if (children) {
            t.appendChild(me.getTaskTree(children));
        }
        
        t._Id = id;
        me.taskMap[t._Id] = t;
        
        return t;
    }
    // endregion
    
    // region CALENDARS
    processCalendarChildren(children) {
        return children.map(this.processCalendar, this);
    }
    
    processCalendarIntervals(data) {
        const
            result      = [],
            intervals   = data.DefaultAvailability;
        
        if (intervals && intervals.length) {
            // Iterate over every element, making non working intervals
            for (let i = 0, l = intervals.length - 1; i < l; i++) {
                let start = intervals[i],
                    end   = intervals[i + 1];
                
                result.push({
                    recurrentStartDate : `every weekday at ${start.split('-')[1]}`,
                    recurrentEndDate   : `every weekday at ${end.split('-')[0]}`,
                    isWorking          : false
                });
            }
            
            // connect last and first availability intervals
            result.push({
                recurrentStartDate : `every weekday at ${intervals[intervals.length - 1].split('-')[1]}`,
                recurrentEndDate   : `every weekday at ${intervals[0].split('-')[0]}`,
                isWorking          : false
            });
        }
        
        result.push({
            recurrentStartDate : `on ${days[data.WeekendFirstDay]} at 0:00`,
            recurrentEndDate   : `on ${days[days.length - 1 == data.WeekendSecondDay ? 0 : data.WeekendSecondDay + 1]} at 00:00`,
            isWorking          : false
        });
        
        return result;
    }
    
    processCalendar(data) {
        const
            me        = this,
            id        = data.Id,
            children  = data.children,
            intervals = me.processCalendarIntervals(data);
    
        delete data.children;
        delete data.Id;
        
        const t = new me.calendarManager.modelClass({
            name         : data.Name,
            daysPerWeek  : data.DaysPerWeek,
            daysPerMonth : data.DaysPerMonth,
            leaf         : data.leaf,
            expanded     : true,
            intervals
        });
        
        if (children) {
            t.appendChild(me.processCalendarChildren(children));
        }
        
        t._Id = id;
        me.calendarMap[t._Id] = t;
        
        return t;
    }
    
    // Entry point of calendars loading
    processCalendars(data) {
        const
            me       = this,
            metaData = data.calendars.metaData;
    
        delete data.calendars.metaData;
        
        const processed = me.processCalendarChildren(data.calendars.children);
        
        // remember passed project calendar identifier ..we will set it later after tasks are loaded
        me.projectCalendar = metaData && metaData.projectCalendar;
        
        return processed;
    }
    // endregion
}
/* eslint-disable no-unused-vars */

const
    project = window.project = new ProjectModel({
        transport : {
            load : {
                url : '../_datasets/launch-saas.json'
            }
        }
    }),
    importer         = new Importer(project),
    [input, sendBtn] = WidgetHelper.append([
        {
            type         : 'filepicker',
            text         : 'File',
            buttonConfig : {
                cls : 'b-blue b-raised'
            },
            listeners : {
                change : ({ files }) => {
                    if (files.length) {
                        sendBtn.enable();
                    }
                    else {
                        sendBtn.disable();
                    }
                },
                clear : () => {
                    sendBtn.disable();
                }
            }
        },
        {
            type     : 'button',
            text     : 'Import data',
            cls      : 'b-orange b-raised b-load-button',
            disabled : true,
            onClick  : () => {
                const files = input.files;

                if (files) {
                    const formData = new FormData();
                    formData.append('mpp-file', files[0]);

                    gantt.maskBody('Importing project ...');

                    AjaxHelper.post('php/load.php', formData, { parseJson : true })
                        .then(async response => {
                            const json = response.parsedJson;
                            if (json.success && json.data) {
                                importer.importData(json.data);
                                gantt.zoomToFit();
                                await project.propagate();
                                input.clear();
                                gantt.unmaskBody();
                                Toast.show('File imported successfully!');
                            }
                            else {
                                onError(`Import error: ${json.msg}`);
                            }
                        }).catch(response => {
                            onError(`Import error: ${response.error || response.message}`);
                        });
                }
            }
        }
    ], { insertFirst : document.getElementById('tools') || document.body });

const gantt = new Gantt({
    adopt : 'container',

    startDate : '2019-01-08',
    endDate   : '2019-04-01',

    project,

    columns : [
        { type : 'name', field : 'name', text : 'Name', width : 250 }
    ],

    viewPreset : 'weekAndDayLetter'
});

function onError(text) {
    gantt.unmaskBody();
    console.error(text);

    Toast.show({
        html    : text,
        color   : 'b-red',
        style   : 'color:white',
        timeout : 3000
    });
}

project.load();
