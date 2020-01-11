"use strict";

/*global DocsBrowserInstance*/

/*eslint no-undef: "error"*/
DocsBrowserInstance.animateScroll = false;
describe('Open all links in docs tree and assert correct content + no crashes', function (t) {
  var navigationTree = DocsBrowserInstance.navigationTree,
      data;
  var ignoreTopics = ['demos', 'engineDocs'],
      ignoreLinks = [],
      ignoreClasses = ['guides/gettingstarted/sources.md', 'guides/data/treedata.md', 'guides/data/displayingdata.md'];

  var store = navigationTree.store,
      records = [],
      contentElement = document.getElementById('content'),
      findMemberInClass = function findMemberInClass(clsRecord, propertyType, memberName, isStatic) {
    var found = (clsRecord.data[propertyType] || []).find(function (mem) {
      return mem.name === memberName && mem.scope === 'static' === isStatic;
    });

    if (!found && clsRecord.data.extends) {
      var superClass = store.getById(clsRecord.data.extends[0]);
      found = findMemberInClass(superClass, propertyType, memberName, isStatic);
    }

    return found;
  },
      assert = function assert(records, callback) {
    var classRecord = records.shift();

    if (!classRecord) {
      callback();
      return;
    }

    location.hash = classRecord.data.fullName;
    t.it('Checking ' + classRecord.name, function (t) {
      t.chain({
        waitForSelector: "#content h1:contains(".concat(classRecord.name, ")")
      }, {
        waitForSelector: '.b-docs-loaded'
      }, {
        waitForSelectorNotFound: '.external-target:empty'
      }, function (next) {
        t.notOk(contentElement.innerHTML.includes('<div class="description">undefined</div>'), 'No undefined descriptions');
        data = store.getById(classRecord.id).data; // records data is replaced when showing inherited, need to get it again

        t.contentLike(contentElement.querySelector('h1'), classRecord.name, 'Document has the correct name');
        next();
      }, // Trying this to see if it solves test being flaky in FF
      {
        waitFor: function waitFor() {
          return data.configs && data.configs.length ? contentElement.querySelectorAll('.configs .config').length === data.configs.length : true;
        }
      }, function (next) {
        if (data.configs && data.configs.length) {
          t.is(contentElement.querySelectorAll('.configs .config').length, data.configs.length, 'Configs rendered');
        }

        if (data.extends && data.extends.length) {
          t.ok(contentElement.querySelector('.extends'), 'Extends rendered');
        }

        if (data.functions && data.functions.length) {
          t.is(contentElement.querySelectorAll('.functions .function').length, data.functions.length, 'Functions rendered');
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = data.functions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var f = _step.value;
              var fId = f.scope === 'static' ? f.name + '-static' : f.name;

              if (f.parameters) {
                t.is(contentElement.querySelectorAll('#content #function-' + fId + ' .function-body .parameter').length, f.parameters.length, fId + ': function params rendered');
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }

        if (data.properties && data.properties.length) {
          t.is(contentElement.querySelectorAll('.properties .property').length, data.properties.length, 'Properties rendered');
        }

        if (data.events) {
          t.is(contentElement.querySelectorAll('.events .event').length, data.events.length, 'Events rendered');
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = data.events[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var e = _step2.value;

              if (e.parameters) {
                t.is(contentElement.querySelectorAll('#event-' + e.name + '.event .parameter').length, e.parameters.length, e.name + ' event params rendered');
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        } // verify all internal links are correct


        Array.from(contentElement.querySelectorAll('a[href^="#"]:not(.summary-icon):not(.inherited)')).forEach(function (node) {
          var href = node.getAttribute('href').substring(1),
              className = href.split('#')[0],
              member = href.split('#')[1],
              clsRecord = navigationTree.store.getById(className);

          if (!clsRecord && !ignoreClasses.includes(className)) {
            t.fail(classRecord.id + ': ' + className + ' not found');
          } else if (member) {
            var parts = member.split('-'),
                name = parts[1],
                type = parts[0],
                isStatic = parts.length === 3,
                propertyName = type === 'property' ? 'properties' : type + 's';
            var found = false;

            if (parts.length > 1) {
              found = findMemberInClass(clsRecord, propertyName, name, isStatic);
            }

            if (!found && !ignoreLinks.includes(href)) {
              t.fail(classRecord.id + ' - docs link not found: ' + href);
            }
          }
        }); // verify all links to global symbols are OK

        Array.from(contentElement.querySelectorAll('a.type[target=_blank]')).forEach(function (node) {
          var symbolName = node.innerHTML.trim().replace('[]', '').replace('...', '');

          if (symbolName !== 'TouchEvent' && symbolName !== 'undefined' && symbolName !== 'null' && symbolName !== 'Class' && !window[symbolName]) {
            t.fail(classRecord.id + ' - docs link not found: ' + symbolName);
          }
        });
        assert(records, callback);
      });
    });
  };

  t.chain({
    waitForEvent: [DocsBrowserInstance, 'load'],
    trigger: function trigger() {
      DocsBrowserInstance.onSettingsChange({
        settings: {
          showPublic: true,
          showInternal: true,
          showPrivate: true,
          showInherited: true
        }
      });
    }
  }, {
    waitForSelector: '#bryntumgantt:textEquals(Bryntum Gantt)',
    desc: 'Initial content shown'
  }, {
    waitForSelectorNotFound: '.loading'
  }, function (next) {
    navigationTree.expandAll();
    store.traverse(function (classRecord) {
      if ((!classRecord.children || !classRecord.children.length) && !ignoreTopics.includes(classRecord.get('id')) && !classRecord.isGuide) {
        records.push(classRecord);
      }
    });
    assert(records, next);
  });
});