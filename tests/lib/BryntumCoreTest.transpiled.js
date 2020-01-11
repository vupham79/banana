"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var paramValueRegExp = /^(\w+)=(.*)$/,
    parseParams = function parseParams(paramString) {
  var result = {},
      params = paramString ? paramString.split('&') : []; // loop through each 'filter={"field":"name","operator":"=","value":"Sweden","caseSensitive":true}' string
  // So we cannot use .split('='). Using forEach instead of for...of for IE

  params.forEach(function (nameValuePair) {
    var _paramValueRegExp$exe = paramValueRegExp.exec(nameValuePair),
        _paramValueRegExp$exe2 = _slicedToArray(_paramValueRegExp$exe, 3),
        match = _paramValueRegExp$exe2[0],
        name = _paramValueRegExp$exe2[1],
        value = _paramValueRegExp$exe2[2];

    if (match) {
      var paramValue = result[name];

      if (paramValue) {
        if (!Array.isArray(paramValue)) {
          paramValue = result[name] = [paramValue];
        }

        paramValue.push(value);
      } else {
        result[name] = value;
      }
    }
  });
  return result;
};

Class('BryntumCoreTest', {
  isa: Siesta.Test.Browser,
  override: {
    setup: function setup(callback, errback) {
      var me = this,
          allowedMessageRe = /promise rejection/,
          harness = me.harness,
          global = me.global,
          b = global.bryntum,
          ns = b && (b.core || b.grid || b.scheduler || b.schedulerpro || b.gantt); // running with bundle, but tests are written for import. need to publish all classes to global

      if (ns) {
        // If there's no UI, disable creation of debugging data by Base constructor
        if (!window.Ext) {
          global.bryntum.DISABLE_DEBUG = true;
        }

        for (var className in ns) {
          if (!global[className]) global[className] = ns[className];
        }
      }

      if (!harness.getDescriptorConfig(harness.getScriptDescriptor(me), 'usesConsole')) {
        // Allow no noise in the console
        global.console.error = global.console.warn = global.console.log = global.console.info = function (msg) {
          if (!allowedMessageRe.exec(msg)) {
            // eslint-disable-next-line no-useless-call
            me.fail(['console output: '].concat([].slice.apply(arguments)).join(''));
          }

          console.log(msg);
        };
      }

      if (!me.parent && harness.getScriptDescriptor(me).recordVideo && global.location.host === 'local') {
        me.startVideoRecording(callback);
      } else {
        me.afterEach(function (t, callback) {
          return me.verifyNoTimeoutsAfterSubTest(t, callback);
        });
        me.SUPER(callback, errback);
      }

      if (global && global.DOMRect) {
        Object.defineProperty(global.DOMRect.prototype, 'x', {
          get: function get() {
            return me.fail('x property accessed from a DOMRect');
          }
        });
        Object.defineProperty(global.DOMRect.prototype, 'y', {
          get: function get() {
            return me.fail('y property accessed from a DOMRect');
          }
        });
      }
    },
    onTearDown: function onTearDown(fn) {
      this._tearDownHook = fn;
    },
    tearDown: function tearDown(callback) {
      var _arguments = arguments;
      var me = this;

      if (me.isFailed() && me.rootCause) {
        var failedAssertions = me.getFailedAssertions(),
            failMsg = failedAssertions[0] && (failedAssertions[0].description || failedAssertions[0].annotation),
            err = new Error(me.name + ': ' + (failMsg || ''));
        err.stack = ''; // disable grouping of tests by callstack

        me.rootCause.finalizeSiestaTestCallback = callback;
        me.rootCause.logException(err);
      } else {
        if (me._tearDownHook) {
          me._tearDownHook(function () {
            return me.SUPERARG(_arguments);
          });
        } else {
          me.SUPERARG(arguments);
        }
      }
    },
    // Ensure we don't start next t.it if there are active timeouts
    verifyNoTimeoutsAfterSubTest: function verifyNoTimeoutsAfterSubTest(test, callback) {
      var me = this;

      if (!me.harness.getScriptDescriptor(me).disableNoTimeoutsCheck) {
        var pollCount = 0;

        var bryntum = me.global && me.global.bryntum,
            poll = function poll() {
          if (!bryntum || !bryntum.globalDelays || bryntum.globalDelays.isEmpty()) {
            callback();
          } else {
            me.global.setTimeout(poll, pollCount ? 50 : 0);
            pollCount++;
          }
        };

        poll();
      } else {
        callback();
      }
    } // Do not remove, handy for finding "leaking" timers
    // launchSubTest(subTest, callback) {
    //     if (this.global.bryntum && this.global.bryntum.globalDelays && !this.global.bryntum.globalDelays.isEmpty()) {
    //         debugger;
    //         this.fail('Active timeouts found');
    //     }
    //     this.SUPERARG(arguments);
    // }

  },
  methods: {
    initialize: function initialize() {
      this.SUPERARG(arguments);
      this.on('beforetestfinalizeearly', this.performPostTestSanityChecks);
    },
    performPostTestSanityChecks: function performPostTestSanityChecks(evt, t) {
      if (!this.parent && !this.url.match(/docs\//)) {
        this.assertNoDomGarbage(t);
        this.assertNoResizeMonitors();
      }
    },
    isOnline: function isOnline() {
      return window.location.href.match(/bryntum\.com/i);
    },
    touchStart: function touchStart(element, identifier) {
      if (!identifier) {
        identifier = Math.round(Math.random() * 1000000);
      }

      var box = element.getBoundingClientRect(),
          x = box.left + box.width / 2,
          y = box.left + box.height / 2,
          touch = new Touch({
        target: element,
        identifier: identifier,
        pageX: x,
        pageY: y,
        screenX: x,
        screenY: y,
        clientX: x,
        clientY: y,
        radiusX: 1,
        radiusY: 1,
        rotationAngle: 0,
        force: 0.5
      }),
          touches = [touch],
          touchEvent = new TouchEvent('touchstart', {
        bubbles: true,
        cancelable: true,
        touches: touches,
        changedTouches: touches,
        targetTouches: touches
      });
      element.dispatchEvent(touchEvent);
      return touch;
    },
    touchEnd: function touchEnd(touch) {
      var touches = [touch],
          touchEvent = new TouchEvent('touchend', {
        bubbles: true,
        cancelable: true,
        touches: touches,
        changedTouches: touches,
        targetTouches: touches
      });
      touch.target.dispatchEvent(touchEvent);
    },
    addListenerToObservable: function addListenerToObservable(observable, event, listener, isSingle) {
      if ('on' in observable) {
        observable.on(event, listener);
      } else if ('addEventListener' in observable) {
        observable.addEventListener(event, listener);
      }
    },
    removeListenerFromObservable: function removeListenerFromObservable(observable, event, listener) {
      observable.un(event, listener);
    },
    getTimeZone: function getTimeZone() {
      var Date = this.global.Date,
          date = new Date();
      return date.toLocaleString().replace(/.*(GMT.*)/, '$1');
    },
    getDSTDates: function getDSTDates() {
      var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2012;
      var Date = this.global.Date,
          yearStart = new Date(year, 0, 1),
          yearEnd = new Date(year, 11, 31),
          dstDates = [];

      for (var i = yearStart; i <= yearEnd; i = new Date(i.setDate(i.getDate() + 1))) {
        var midnightOffset = new Date(year, i.getMonth(), i.getDate()).getTimezoneOffset(),
            noonOffset = new Date(year, i.getMonth(), i.getDate(), 12).getTimezoneOffset();
        if (midnightOffset != noonOffset) dstDates.push(i);
      }

      return dstDates;
    },
    assertNoDomGarbage: function assertNoDomGarbage(t) {
      var me = this,
          body = me.global.document.body,
          invalid = ['[id*="undefined"]', '[id*="null"]', '[class*="undefined"]', '[class*="null"]', '[class*="null"]']; // Data URL can violate the check for NaN in some cases

      body.querySelectorAll('.b-sch-background-canvas').forEach(function (e) {
        return e.remove();
      });
      me.contentNotLike(body, 'NaN', 'No "NaN" string found in DOM');
      me.contentNotLike(body, ' id=""', 'No empty id found in DOM');
      me.contentNotLike(body, /L{.*?}/, 'No non-localized string templates L{xx}');

      if (!t.skipSanityChecks) {
        me.unlike(body.outerHTML, /object object|undefined/i, 'No "Object object" or undefined string found in DOM');

        if (me.global.monkeyActions && body.outerHTML.match(/object object|undefined/i)) {
          me.fail('Monkey steps:' + JSON.stringify(me.global.monkeyActions));
        }
      }

      if (me.$(invalid.join(','), body).length) {
        me.selectorNotExists(invalid, 'No DOM attribute garbage found in DOM');

        if (me.global.monkeyActions && body.querySelector(invalid)) {
          me.fail('Monkey steps:' + JSON.stringify(me.global.monkeyActions));
        }
      }
    },
    assertNoResizeMonitors: function assertNoResizeMonitors() {
      var _this = this;

      Array.from(document.querySelectorAll('*')).forEach(function (e) {
        if (e._bResizemonitor && e._bResizemonitor.handlers.length) {
          _this.fail("".concat(e.tagName, "#e.id has ").concat(e._bResizemonitor.handlers.length, " resize monitors attached"));
        }
      });
    },
    waitForAnimationFrame: function waitForAnimationFrame(next) {
      var frameFired = false;
      this.waitFor(function () {
        return frameFired;
      }, next);
      requestAnimationFrame(function () {
        frameFired = true;
      });
    },
    // Allows `await t.animationFrame`
    animationFrame: function animationFrame() {
      var frames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var global = this.global;
      var count = 0,
          resolveFn;

      function frame() {
        if (count++ < frames) {
          global.requestAnimationFrame(function () {
            return frame();
          });
        } else {
          resolveFn();
        }
      }

      return new Promise(function (resolve) {
        resolveFn = resolve;
        frame();
      });
    },

    /**
     * Registers the passed URL to return the passed mocked up Fetch Response object to the
     * AjaxHelper's promise resolve function.
     * @param {String} url The url to return mock data for
     * @param {Object|Function} response A mocked up Fetch Response object which must contain
     * at least a `responseText` property, or a function to which the `url` and a `params` object
     * is passed which returns that.
     * @param {String} response.responseText The data to return.
     * @param {Boolean} [response.synchronous] resolve the Promise immediately
     * @param {Number} [response.delay=100] resolve the Promise after this number of milliseconds.
     */
    mockUrl: function mockUrl(url, response) {
      var me = this,
          AjaxHelper = me.global.AjaxHelper;

      if (!AjaxHelper) {
        throw new Error('AjaxHelper must be injected into the global namespace');
      }

      (me.mockAjaxMap || (me.mockAjaxMap = {}))[url] = response; // Inject the override into the AjaxHelper instance

      if (!AjaxHelper.originalFetch) {
        // cannot use Reflect in IE11
        //Reflect.set(AjaxHelper, 'originalFetch', AjaxHelper.fetch);
        //Reflect.set(AjaxHelper, 'fetxh', Test.mockAjaxFetch.bind(Test));
        AjaxHelper.originalFetch = AjaxHelper.fetch;
      }

      AjaxHelper.fetch = me.mockAjaxFetch.bind(me);
    },
    mockAjaxFetch: function mockAjaxFetch(url, options) {
      var urlAndParams = url.split('?'),
          win = this.global;
      var result = this.mockAjaxMap[urlAndParams[0]],
          parsedJson = null;

      if (result) {
        if (typeof result === 'function') {
          result = result(urlAndParams[0], parseParams(urlAndParams[1]), options);
        }

        try {
          parsedJson = options.parseJson && JSON.parse(result.responseText);
        } catch (error) {
          parsedJson = null;
          result.error = error;
        }

        result = win.Object.assign({
          status: 200,
          ok: true,
          headers: new win.Headers(),
          statusText: 'OK',
          url: url,
          parsedJson: parsedJson,
          text: function text() {
            return new Promise(function (resolve) {
              resolve(result.responseText);
            });
          },
          json: function json() {
            return new Promise(function (resolve) {
              resolve(parsedJson);
            });
          }
        }, result);
        return new win.Promise(function (resolve, reject) {
          if (result.synchronous) {
            resolve(result);
          } else {
            win.setTimeout(function () {
              resolve(result);
            }, 'delay' in result ? result.delay : 100);
          }
        });
      } else {
        return win.AjaxHelper.originalFetch(url, options);
      }
    },
    isRectApproxEqual: function isRectApproxEqual(rect1, rect2, threshold, descr) {
      for (var o in rect1) {
        this.isApprox(rect1[o], rect2[o], threshold, descr || '');
      }
    },
    // t.isCssTextEqual(element, 'position: absolute; color: blue;')
    isCssTextEqual: function isCssTextEqual(src, cssText, desc) {
      if (src instanceof this.global.HTMLElement) {
        src = src.style.cssText;
      }

      if (src === cssText) {
        this.pass(desc || 'Style matches');
      } else {
        var srcParts = src.split(';').map(function (p) {
          return p.trim();
        }),
            targetParts = cssText.split(';').map(function (p) {
          return p.trim();
        });
        srcParts.sort();
        targetParts.sort();
        this.isDeeply(srcParts, targetParts);
      }
    },
    startVideoRecording: function startVideoRecording(callback) {
      var me = this,
          appIds = {
        grid: '9ea6c8f84f179d4c4b7be11ff217bc29367357f8',
        scheduler: '3dcfabf52d4fa704fb95259a317c72a6ce376313',
        gantt: '9df03cbdc00b455de8bfe58d831e6fd76cc8881e'
      },
          productId = location.href.includes('gantt') ? 'gantt' : location.href.includes('scheduler') ? 'scheduler' : 'grid',
          document = me.global.document,
          script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = 'https://app.therootcause.io/rootcause-full.js';
      script.addEventListener('load', startRootCause);
      document.head.appendChild(script);

      function startRootCause() {
        me.rootCause = new me.global.RC.Logger({
          captureScreenshot: true,
          applicationId: appIds[productId],
          maxNbrLogs: 1,
          recordSessionVideo: true,
          videoBaseUrl: me.global.location.href.replace(/\/\/local/, '//dev.bryntum.com'),
          onErrorLogged: function onErrorLogged(responseText) {
            var data;

            try {
              data = JSON.parse(responseText);
            } catch (e) {}

            if (data && data.link) {
              me.fail('VIDEO: ' + data.link);
            }

            this.finalizeSiestaTestCallback && this.finalizeSiestaTestCallback();
          },
          onErrorLogFailed: function onErrorLogFailed() {
            this.finalizeSiestaTestCallback && this.finalizeSiestaTestCallback();
          }
        });
        callback.call(me);
      }
    },
    handlerThrowsOk: function handlerThrowsOk(fn) {
      var me = this,
          oldOnError = me.global.onerror,
          success = false,
          doneCalled = false,
          done = function done() {
        if (!doneCalled) {
          doneCalled = true;
          me.global.onerror = oldOnError;

          if (success) {
            me.pass('Expected error was thrown');
          } else {
            me.fail('Expected error was not thrown');
          }

          me.endAsync(async);
        }
      },
          async;

      me.global.onerror = function (ex) {
        success = true;
        done();
        return true;
      };

      async = me.beginAsync(); // We must return the destroy method first in case the
      // passed method is not in fact async.

      setTimeout(fn, 0);
      return done;
    },
    removeIframe: function removeIframe(iframeId) {
      var t = this,
          _document = t.global.document,
          iframe = _document.getElementById(iframeId);

      if (iframe) {
        iframe.parentElement.removeChild(iframe);
      } else {
        t.fail('Cannot find iframe with id ' + iframeId);
      }
    },
    setIframeUrl: function setIframeUrl(iframe, url, callback) {
      var _this2 = this;

      var async = this.beginAsync(),
          doc = iframe.contentDocument;

      iframe.onload = function () {
        _this2.endAsync(async);

        iframe.onload = undefined;
        callback();
      };

      if (url && doc.location !== url) {
        doc.location = url;
      } else {
        doc.location.reload();
      }
    },
    setIframe: function setIframe(config) {
      config = config || {};

      var t = this,
          id = config.iframeId || config.id,
          onload = config.onload,
          html = config.html,
          _document = t.global.document,
          iframe = _document.body.appendChild(_document.createElement('iframe'));

      var async = config.async;
      iframe.width = 900;
      iframe.height = 1600;

      if (id) {
        iframe.setAttribute('id', id);
      }

      var doc = iframe.contentWindow.document;

      if (onload) {
        async = async || t.beginAsync();

        iframe.onload = function () {
          t.endAsync(async);
          onload(doc, iframe);
        };
      }

      if (html) {
        doc.open();
        doc.write(html);
        doc.close();
      }

      return iframe;
    },
    getSVGBox: function getSVGBox(svgElement) {
      var svgBox = svgElement.getBBox(),
          containerBox = svgElement.viewportElement.getBoundingClientRect();
      return {
        left: svgBox.x + containerBox.left,
        right: svgBox.x + containerBox.left + svgBox.width,
        top: svgBox.y + containerBox.top,
        bottom: svgBox.y + containerBox.top + svgBox.height
      };
    }
  }
}); // eslint-disable-next-line no-unused-vars

var BryntumTestHelper =
/*#__PURE__*/
function () {
  function BryntumTestHelper() {
    _classCallCheck(this, BryntumTestHelper);
  }

  _createClass(BryntumTestHelper, null, [{
    key: "prepareMonkeyTests",
    value: function prepareMonkeyTests(items) {
      var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var urls = [];
      return items.map(function (item) {
        if (item && item.skipMonkey !== true) {
          var pageUrl = typeof item === 'string' ? '../examples/' + item : item.pageUrl;

          if (pageUrl) {
            var id = pageUrl.replace(/\.+\//g, '').replace(/[?&./]/g, '-').replace('--', '-'),
                config = {};

            if (item instanceof Object) {
              for (var key in item) {
                if (item.hasOwnProperty(key)) {
                  config[key] = item[key];
                }
              }
            }

            config.isMonkey = true;
            config.pageUrl = pageUrl;
            config.keepPageUrl = true;
            config.url = "".concat(root, "examples/monkey.t.js?id=").concat(id); // if monkeySetup hook is provided call it

            if (item.monkeySetup) {
              item.monkeySetup(config, item);
            } // Avoid duplicates


            if (urls.indexOf(config.url) === -1) {
              urls.push(config.url);
              return config;
            }
          }
        }
      });
    }
  }, {
    key: "updateTitle",
    value: function updateTitle(item, testUrl) {
      // Split testUrl to display in tree grid
      if (testUrl && typeof URL === 'function') {
        var url = new URL("http://bryntum.com/".concat(testUrl)),
            pathName = url.pathname,
            idx = pathName.lastIndexOf('/'),
            testName = pathName.substring(idx + 1),
            testPath = !item.isMonkey ? pathName.substring(1, idx) : item.pageUrl;
        item.title = "".concat(testName).concat(url.search, " ").concat(testPath !== '' ? "[ ".concat(testPath, " ]") : '');
      }
    }
  }, {
    key: "prepareItem",
    value: function prepareItem(item, mode, isTrial) {
      // Update test url and pageUrl for mode
      if (mode !== 'es6') {
        if (item.url && !item.keepUrl) {
          item.url = item.url.replace('.t.js', ".t.".concat(mode, ".js"));
        }

        if (item.pageUrl && !item.keepPageUrl && !(mode === 'module' && isTrial)) {
          // keep querystring also for bundle (works with both url/?develop and url?develop)
          var qs = item.pageUrl.match(/(.*?)(\/*)([?#].*)/);

          if (qs) {
            item.pageUrl = "".concat(qs[1], "/index.").concat(mode, ".html").concat(qs[3]);
          } else {
            item.pageUrl += "/index.".concat(mode, ".html");
          }
        }
      }

      this.updateTitle(item, item.url || item.pageUrl);
    }
  }, {
    key: "normalizeItem",
    value: function normalizeItem(item, mode) {
      // Apply custom properties for mode or default
      if (item instanceof Object) {
        for (var key in item) {
          if (item.hasOwnProperty(key)) {
            var val = item[key];

            if (val && (val[mode] || val.default)) {
              item[key] = val[mode] ? val[mode] : val.default;
            }
          }
        }
      }
    }
  }, {
    key: "prepareItems",
    value: function prepareItems(items, mode, isTrial) {
      items && items.map(function (item, i) {
        if (item) {
          BryntumTestHelper.normalizeItem(item, mode); // Include for bundle and skip handling

          if (item.skip !== null && item.skip === true || item.includeFor && item.includeFor.replace(' ', '').split(',').indexOf(mode) === -1) {
            items[i] = null;
          } else {
            // Normalize URL
            if (typeof item === 'string') {
              item = items[i] = {
                url: item
              };
            }

            BryntumTestHelper.prepareItem(items[i], mode, isTrial);
            BryntumTestHelper.prepareItems(item.items, mode, isTrial);
          }
        }
      });
      return items;
    }
  }]);

  return BryntumTestHelper;
}();
