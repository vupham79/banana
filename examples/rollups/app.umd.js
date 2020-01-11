"use strict";

/* eslint-disable no-unused-vars */
var project = window.project = new bryntum.gantt.ProjectModel({
  transport: {
    load: {
      url: 'data/tasks.json'
    }
  }
});
var gantt = new bryntum.gantt.Gantt({
  adopt: 'container',
  project: project,
  columns: [{
    type: 'wbs'
  }, {
    type: 'name'
  }],
  subGridConfigs: {
    locked: {
      flex: 1
    },
    normal: {
      flex: 2
    }
  },
  viewPreset: 'monthAndYear',
  // Allow extra space for rollups
  rowHeight: 50,
  barMargin: 7,
  columnLines: true,
  features: {
    rollups: true
  }
});
bryntum.gantt.WidgetHelper.append([{
  cls: 'b-blue b-bright',
  type: 'checkbox',
  text: 'Show Rollups',
  checked: true,
  toggleable: true,
  onAction: function onAction(_ref) {
    var checked = _ref.checked;
    gantt.features.rollups.disabled = !checked;
  }
}], {
  insertFirst: document.getElementById('tools') || document.body
});
project.load();