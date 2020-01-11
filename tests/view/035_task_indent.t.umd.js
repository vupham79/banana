"use strict";

StartTest(function (t) {
  var gantt, project;
  t.beforeEach(function () {
    return gantt && gantt.destroy();
  });

  function getGantt(projectConfig) {
    projectConfig = Object.assign({
      startDate: '2017-06-19',
      eventsData: [{
        id: 11,
        name: 'Node 11',
        startDate: '2017-06-19',
        endDate: '2017-06-24',
        expanded: true,
        children: [{
          id: 1,
          name: 'Node 1',
          startDate: '2017-06-19',
          endDate: '2017-06-24'
        }, {
          id: 2,
          name: 'Node 2',
          startDate: '2017-06-19',
          endDate: '2017-06-24',
          expanded: true,
          children: [{
            id: 3,
            name: 'Node 3',
            startDate: '2017-06-19',
            endDate: '2017-06-24'
          }, {
            id: 4,
            name: 'Node 4',
            startDate: '2017-06-19',
            endDate: '2017-06-24'
          }, {
            id: 5,
            name: 'Node 5',
            startDate: '2017-06-19',
            endDate: '2017-06-24'
          }]
        }]
      }]
    }, projectConfig);
    gantt = t.getGantt({
      height: 700,
      appendTo: document.body,
      project: projectConfig,
      startDate: projectConfig.startDate
    });
    project = gantt.project;
    return gantt;
  }

  t.it('Sanity', function (t) {
    var taskStore = getGantt().taskStore,
        node2 = taskStore.getById(2),
        node3 = taskStore.getById(3),
        node4 = taskStore.getById(4),
        node5 = taskStore.getById(5);
    t.notOk(node2.isLeaf, 'Task 2 is not leaf');
    t.ok(node3.isLeaf, 'Task 3 is leaf'); // outdenting a task which should stay at the same level and get 2 children

    t.is(node3.parentIndex, 0, 'Node3 has parentIndex 0');
    t.chain({
      waitForPropagate: project
    }, function (next) {
      gantt.outdent(node3).then(next);
    }, function (next) {
      t.notOk(node2.isLeaf, 'Task 2 is still a parent after task 3 outdent');
      t.is(node3.parentIndex, 2, 'Node3 now has parentIndex 2');
      t.isDeeply(node2.children, [node4, node5], 'Task 3 now has tasks 4 and 5 as children'); // indenting it back - should restore the previous state

      gantt.indent(node3).then(next);
    }, function (next) {
      t.notOk(node2.isLeaf, 'Task 2 is not leaf after task 3 indent');
      t.isDeeply(node2.children.length, 3, 'Task 2 now has tasks 3, 4 and 5 as children again');
      t.is(node3.parentIndex, 2, 'Node3 still has parentIndex 2'); // clearing the dirty flag()

      node3.clearChanges();
      t.notOk(node3.isModified, 'Node3 is now clean'); // indenting node3 one more time - nothing should happen

      gantt.indent([node3, node4, node5]).then(next);
    }, function () {
      t.isDeeply(node2.children, [node4], 'Task 2 now has tasks 4 as children');
      t.isDeeply(node4.children, [node5, node3], 'Task 4 now has tasks 5 as children');
      t.ok(node4.isModified, 'Node4 dirty after indent');
      t.ok(node5.isModified, 'Node5 dirty after indent');
    });
  });
  t.it('Should see 2 indented tasks in a parent stay on the same level', function (t) {
    var taskStore = getGantt().taskStore,
        node2 = taskStore.getById(2),
        node3 = taskStore.getById(3),
        node4 = taskStore.getById(4),
        node5 = taskStore.getById(5);
    t.chain({
      waitForPropagate: project
    }, function (next) {
      gantt.indent([node4, node5]).then(next);
    }, function (next) {
      t.isDeeply(node3.children, [node4, node5], 'Task 3 now has tasks 4,5 as children');
      t.is(node4.parentIndex, 0);
      t.is(node5.parentIndex, 1);
      next();
    }, function (next) {
      gantt.outdent([node4, node5]).then(next);
    }, function (next) {
      t.isDeeply(node2.children.map(function (n) {
        return n.id;
      }), [3, 4, 5], 'Task 2 now has tasks 3,4,5 as children');
      gantt.indent([node5, node4]).then(next);
    }, function () {
      t.isDeeply(node3.children.map(function (n) {
        return n.id;
      }), [4, 5], 'Task 3 now has tasks 4,5 as children, even if tasks are passed in wrong order');
    });
  });
  /** Can't implement this test right now
  t.it('Should not indent project nodes', t => {
      var taskStore = getGantt({
          eventsData : [
              {
                  id        : 1,
                  startDate : '2010-01-04',
                  duration  : 4,
                  TaskType  : 'Gnt.model.Project'
              },
              {
                  id        : 2,
                  startDate : '2010-01-04',
                  duration  : 4,
                  TaskType  : 'Gnt.model.Project'
              }
          ]
      });
       t.wontFire(taskStore, ['update', 'datachanged', 'remove', 'add']);
      t.firesOk({
          observable : taskStore,
          events     : {
              beforeindentationchange : 1,
              indentationchange       : 1
          }
      });
       gantt.indent(taskStore.getById(2));
      gantt.outdent(taskStore.getById(2));
  });
  */

  t.it('Should handle `false` returned from project#beforeOutdent listener for outdent operation', function (t) {
    var taskStore = getGantt({
      startDate: '2010-01-04',
      eventsData: [{
        id: 1,
        name: 'Task 1',
        startDate: '2010-01-04',
        duration: 4,
        expanded: true,
        children: [{
          id: 2,
          name: 'Task 2',
          startDate: '2010-01-04',
          duration: 4
        }]
      }]
    }).taskStore;
    taskStore.project.on({
      beforeoutdent: function beforeoutdent() {
        return false;
      }
    });
    var storageGeneration = taskStore.storage.generation,
        node1 = taskStore.getById(1),
        node2 = taskStore.getById(2);
    t.chain({
      waitForPropagate: project
    }, function (next) {
      t.wontFire(taskStore, ['update', 'change', 'remove', 'add']);
      gantt.outdent(node2).then(next);
    }, function () {
      t.is(taskStore.storage.generation, storageGeneration);
      t.notOk(node1.isLeaf);
      t.ok(node2.isLeaf);
      t.expect(node2.parent).toBe(node1);
      t.expect(node2.parentId).toBe(1);
    });
  });
  t.it('Should handle `false` returned from project#beforeIndent listener for indent operation', function (t) {
    var taskStore = getGantt({
      eventsData: [{
        id: 1,
        name: 'Task 1',
        startDate: '2010-01-04',
        duration: 4
      }, {
        id: 2,
        name: 'Task 2',
        startDate: '2010-01-04',
        duration: 4
      }]
    }).taskStore;
    taskStore.project.on({
      beforeindent: function beforeindent() {
        return false;
      }
    });
    var storageGeneration = taskStore.storage.generation,
        node1 = taskStore.getById(1),
        node2 = taskStore.getById(2);
    t.chain({
      waitForPropagate: project
    }, function (next) {
      t.wontFire(taskStore, ['update', 'change', 'remove', 'add']);
      gantt.indent(node2).then(next);
    }, function () {
      t.is(taskStore.storage.generation, storageGeneration);
      t.expect(node1.isLeaf).toBe(true);
      t.expect(node2.previousSibling.id).toBe(1);
    });
  });
});