"use strict";

/* eslint-disable no-unused-vars */
var project = new bryntum.gantt.ProjectModel({
  transport: {
    load: {
      url: '../_datasets/launch-saas.json'
    }
  }
});
new bryntum.gantt.Gantt({
  adopt: 'container',
  features: {
    taskTooltip: {
      template: function template(data) {
        var me = this,
            taskRecord = data.taskRecord; // Return the result of the feature's default template, with custom markup appended

        return bryntum.gantt.TaskTooltip.defaultConfig.template.call(me, data) + "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n                        <tr><td>".concat(me.L('Scheduling Mode'), ":</td><td>").concat(taskRecord.schedulingMode, "</td></tr>\n                        <tr><td>").concat(me.L('Calendar'), ":</td><td>").concat(taskRecord.calendar.name, "</td></tr>\n                        <tr><td>").concat(me.L('Critical'), ":</td><td>").concat(taskRecord.critical ? me.L('Yes') : me.L('No'), "</td></tr>\n                    </table>");
      }
    }
  },
  project: project,
  columns: [{
    type: 'name',
    field: 'name',
    width: 250
  }]
});
project.load();