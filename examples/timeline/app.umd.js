"use strict";

/* eslint-disable no-unused-vars */
var setTimelineHeight = function setTimelineHeight(_ref) {
  var source = _ref.source;
  timeline.element.style.height = '';
  ['large', 'medium', 'small'].forEach(function (cls) {
    return timeline.element.classList.remove(cls);
  });
  timeline.element.classList.add(source.text.toLowerCase());
};

bryntum.gantt.WidgetHelper.append([{
  type: 'buttonGroup',
  cls: 'b-raised',
  items: [{
    text: 'Small',
    toggleGroup: 'size',
    color: 'b-blue b-raised',
    listeners: {
      toggle: setTimelineHeight
    }
  }, {
    text: 'Medium',
    toggleGroup: 'size',
    color: 'b-blue b-raised',
    pressed: true,
    listeners: {
      toggle: setTimelineHeight
    }
  }, {
    text: 'Large',
    toggleGroup: 'size',
    color: 'b-blue b-raised',
    listeners: {
      toggle: setTimelineHeight
    }
  }]
}], {
  insertFirst: document.getElementById('tools') || document.body
});
var gantt = new bryntum.gantt.Gantt({
  project: new bryntum.gantt.ProjectModel({
    autoLoad: true,
    transport: {
      load: {
        url: '../_datasets/launch-saas.json'
      }
    }
  }),
  columns: [{
    type: 'name',
    width: 250
  }, {
    type: 'showintimeline',
    width: 150
  }]
});
var timeline = new bryntum.gantt.Timeline({
  appendTo: 'container',
  project: gantt.project
});
gantt.render('container');