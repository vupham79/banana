import { WidgetHelper, AjaxHelper, DomHelper, IdHelper, Tooltip, Toast, BrowserHelper, StringHelper, LocaleManager, Localizable, DataGenerator, Fullscreen, Events, GlobalEvents, VersionHelper, EventHelper, Popup, ResizeHelper, Rectangle, Widget } from '../../build/gantt.module.js?437987';

let earlyErrorEvent;

const errorListener = errorEvent => earlyErrorEvent = errorEvent;

window.addEventListener('error', errorListener);

if (location.protocol === 'file:') {
    alert('ERROR: You must run examples on a webserver (not using the file: protocol)');
}

// needed for tests
window.__BRYNTUM_EXAMPLE = true;

const
    hintKey          = 'preventhints-' + document.location.href,
    productName      = 'gantt', //LEAVE AS IS, DEFAULT PRODUCT NAME
    defaultTheme     = 'Stockholm',
    browserPaths     = [
        '/examples/', // In our source structure
        '/grid/', // On bryntum.com...
        '/scheduler/',
        '/gantt/'
    ],
    themes           = {
        stockholm : 'Stockholm',
        default   : 'Default',
        light     : 'Light',
        dark      : 'Dark',
        material  : 'Material'
    },
    // Demos that should not use RC online
    disableRootCause = [
        'bigdataset',
        'csp'
    ],
    pathName         = location.pathname,
    isDemoBrowser    = browserPaths.some(path => pathName.endsWith(path) || Boolean(pathName.match(path + 'index.*html$'))),
    isSiesta         = window.parent && window.parent.Siesta,
    isOnline         = location.href.includes('bryntum.com'),
    moduleTag        = document.querySelector('script[type=module]'),
    isModule         = pathName.endsWith('module.html') || (moduleTag && moduleTag.src.includes('app.module.js?437987')) || (pathName.endsWith('index.html') && isOnline),
    isUmd            = pathName.endsWith('umd.html'),
    paramValueRegExp = /^(\w+)=(.*)$/,
    parseParams      = function(paramString) {
        const
            result = {},
            params = paramString.split('&');

        // loop through each 'filter={"field":"name","operator":"=","value":"Sweden","caseSensitive":true}' string
        // So we cannot use .split('=')
        for (const nameValuePair of params) {
            const [match, name, value] = paramValueRegExp.exec(nameValuePair);

            if (match) {
                let paramValue = result[name];

                if (paramValue) {
                    if (!Array.isArray(paramValue)) {
                        paramValue = result[name] = [paramValue];
                    }
                    paramValue.push(value);
                }
                else {
                    result[name] = value;
                }
            }
        }
        return result;
    };

document.body.classList.add('b-initially-hidden');

class Shared extends Localizable(Events()) {
    //region Init

    constructor() {

        super();

        const
            me        = this,
            reset     = document.location.href.match(/(\?|&)reset/),
            themeInfo = DomHelper.themeInfo;

        if (reset) {
            BrowserHelper.removeLocalStorageItem('exampleLanguage');
            BrowserHelper.removeLocalStorageItem('bryntumExampleTheme');
        }

        // me.onResize = me.onResize.bind(me);
        me.destroyTooltips = me.destroyTooltips.bind(me);
        //me.onWindowScroll  = me.onWindowScroll.bind(me);

        // Module bundle is used by default online

        me.developmentMode = location.href.match(/(\?|&)develop/);

        me.productName = productName;

        // Only do theme restoration if we are using a standard theme
        if (themeInfo && themes[themeInfo.name.toLowerCase()]) {
            const theme = me.qs('theme', BrowserHelper.getLocalStorageItem('bryntumExampleTheme') || defaultTheme);

            // Apply default theme first time when the page is loading
            me.applyTheme(theme, true);
        }
        else {
            document.body.classList.remove('b-initially-hidden');
        }

        // Enables special styling when generating thumbs
        if (document.location.href.match(/(\?|&)thumb/)) {
            document.body.classList.add('b-generating-thumb');
        }

        // Subscribe on locale update to save it into the localStorage
        me.localeManager.on('locale', (localeConfig) => BrowserHelper.setLocalStorageItem('exampleLanguage', localeConfig.locale.localeName));

        // Apply default locale first time when the page is loading
        me.localeManager.applyLocale(BrowserHelper.getLocalStorageItem('exampleLanguage') || LocaleManager.locale.localeName, false, true);
        //}

        const overrideRowCount = document.location.search.match(/(?:\?|&)rowCount=([^&]*)/);
        if (overrideRowCount) {
            const parts = overrideRowCount[1].split(',');
            if (parts.length === 1) {
                DataGenerator.overrideRowCount = parseInt(parts[0]);
            }
            else {
                DataGenerator.overrideRowCount = parts.map(p => parseInt(p));
            }
        }

        //<debug>
        // const
        //     positionMode    = me.qs('position', 'translate'),
        //     testPerformance = me.qs('testPerformance'),
        //     rowScrollMode   = me.qs('rowScrollMode', 'move');
        //
        // let defaultConfig = Grid.defaultConfig;
        // Object.defineProperty(Grid, 'defaultConfig', {
        //     get : () => {
        //         return Object.assign(defaultConfig, {
        //             testPerformance : testPerformance,
        //             positionMode    : positionMode,
        //             rowScrollMode   : rowScrollMode,
        //             destroyStore    : true
        //         });
        //     }
        // });
        //</debug>

        me.insertHeader();

        // window.addEventListener('resize', me.onResize.bind(me));
        // me.onResize();

        me.loadDescription();
        // Don't load hints for the example browser (or if viewing with ?develop)
        if (!isDemoBrowser && !me.developmentMode) {
            me.loadHints();
        }

        me.initRootCause();

        if (!isDemoBrowser) {
            me.injectFavIcon();
        }

        document.body.style.paddingRight = '0';
    }

    /**
     * Registers the passed URL to return the passed mocked up Fetch Response object to the
     * AjaxHelper's promise resolve function.
     * @param {String} url The url to return mock data for
     * @param {Object|Function} response A mocked up Fetch Response object which must contain
     * at least a `responseText` property, or a function to which the `url` and a `params` object
     * and the `Fetch` `options` object is passed which returns that.
     * @param {String} response.responseText The data to return.
     * @param {Boolean} [response.synchronous] resolve the Promise immediately
     * @param {Number} [response.delay=100] resolve the Promise after this number of milliseconds.
     */
    mockUrl(url, response) {
        const me = this;

        (me.mockAjaxMap || (me.mockAjaxMap = {}))[url] = response;

        // Inject the override into the AjaxHelper instance
        if (!AjaxHelper.originalFetch) {
            AjaxHelper.originalFetch = AjaxHelper.fetch;
        }
        AjaxHelper.fetch = me.mockAjaxFetch.bind(me);
    }

    mockAjaxFetch(url, options) {
        let urlAndParams = url.split('?'),
            result       = this.mockAjaxMap[urlAndParams[0]],
            parsedJson   = null;

        if (result) {
            if (typeof result === 'function') {
                result = result(urlAndParams[0], parseParams(urlAndParams[1]), options);
            }
            try {
                parsedJson = options.parseJson && JSON.parse(result.responseText);
            }
            catch (error) {
                parsedJson = null;
                result.error = error;
            }

            result = Object.assign({
                status     : 200,
                ok         : true,
                headers    : new Headers(),
                statusText : 'OK',
                url        : url,
                parsedJson : parsedJson,
                text       : () => new Promise((resolve) => {
                    resolve(result.responseText);
                }),
                json : () => new Promise((resolve) => {
                    resolve(parsedJson);
                })
            }, result);
            return new Promise(function(resolve, reject) {
                if (result.synchronous) {
                    resolve(result);
                }
                else {
                    setTimeout(function() {
                        resolve(result);
                    }, ('delay' in result ? result.delay : 100));
                }
            });
        }
        else {
            return AjaxHelper.originalFetch(url, options);
        }
    }

    injectFavIcon() {
        DomHelper.createElement({
            tag    : 'link',
            parent : document.head,
            rel    : 'icon',
            href   : '../_shared/images/favicon.png',
            sizes  : '32x32'
        });
    }

    // onResize() {
    //     const container = document.getElementById('container') || document.querySelector('.b-gridbase');
    //
    //     // Demos using  `adopt` will take over container
    //     if (container) {
    //         if (document.body.matches('.b-size-phone')) {
    //             const contentHeight = 667 + 60 + 20;
    //
    //             if (contentHeight > document.body.offsetHeight) {
    //                 const scale = document.body.offsetHeight / contentHeight;
    //                 container.style.transform = `translate(-50%, -50%) scale(${scale})`;
    //             }
    //         }
    //         else {
    //             container.style.transform = '';
    //         }
    //     }
    // }

    //endregion

    //region Header with tools

    insertHeader() {
        const
            pathElements = document.location.pathname.split('/').reduce((result, value) => {
                if (value) {
                    result.push(value);
                }
                return result;
            }, []),
            exampleId    = pathElements[pathElements.length - 1];

        DomHelper.insertFirst(document.getElementById('container'), {
            tag       : 'header',
            className : 'demo-header',
            html      : `
            <div id="title-container">
                <a id="title" href="${isDemoBrowser ? '#' : '../'}${!isDemoBrowser && isUmd ? 'index.umd.html' : ''}#${exampleId}">
                    ${document.title}
                </a>
            </div>
            <div id="tools"></div>
        `
        });

        const tools = document.getElementById('tools') || document.body;

        if (Fullscreen.enabled) {
            const fullscreenButton = WidgetHelper.createWidget({
                type       : 'button',
                id         : 'fullscreen-button',
                icon       : 'b-icon b-icon-fullscreen',
                tooltip    : this.L('Fullscreen'),
                toggleable : true,
                cls        : 'b-blue b-raised',
                keep       : true,
                appendTo   : tools,
                onToggle   : ({ pressed }) => {
                    if (pressed) {
                        Fullscreen.request(document.documentElement);
                    }
                    else {
                        Fullscreen.exit();
                    }
                }
            });

            Fullscreen.onFullscreenChange(() => {
                fullscreenButton.pressed = Fullscreen.isFullscreen;
            });
        }

        this.codeButton = WidgetHelper.createWidget({
            type       : 'button',
            ref        : 'codeButton',
            icon       : 'b-icon b-icon-code',
            cls        : 'b-blue b-raised keep',
            toggleable : true,
            tooltip    : {
                html  : this.L('Click to show the built in code editor'),
                align : 't100-b100'
            },
            preventTooltipOnTouch : true,
            appendTo              : tools,
            hidden                : true,
            keep                  : true,
            async onToggle({ source : button, pressed }) {
                if (pressed) {
                    if (!shared.codeEditor) {
                        shared.codeEditor = await CodeEditor.addToPage(button);
                    }
                    shared.codeEditor.show().then(() => {
                        shared.codeEditor.focus();
                    });
                }
                else {
                    shared.codeEditor.hide();
                }
            }
        });

        const button = this.infoButton = WidgetHelper.createWidget({
            type       : 'button',
            ref        : 'infoButton',
            icon       : 'b-icon b-icon-info',
            cls        : 'b-blue b-raised keep',
            toggleable : true,
            tooltip    : {
                html  : this.L('Click to show info and switch theme or locale'),
                align : 't100-b100'
            },
            preventTooltipOnTouch : true,
            keep                  : true,
            appendTo              : tools
        });

        const headerTools = document.getElementById('header-tools');
        if (headerTools) {
            Array.from(headerTools.children).forEach(child => {
                tools.insertBefore(child, button);
            });
            headerTools.remove();
        }
    }

    //endregion

    //region Hints

    initHints() {
        const me = this;

        if (!me.hints || !WidgetHelper.hasAdapter) return;

        me.toolTips = [];

        const delay = me.hints.delay || 0;

        setTimeout(() =>
            Object.keys(me.hints).forEach((key, i) => {
                if (key) {
                    const target = DomHelper.down(document.body, key);
                    if (!target) return; //throw new Error(`Hint selector ${key} doesnt' match anything`);
                    setTimeout(() => {
                        if (!me.preventHints) {
                            const hint = me.hints[key];
                            me.toolTips.push(new Tooltip({
                                forElement   : target,
                                scrollAction : 'hide',
                                align        : hint.align || 't-b',
                                html         : `<div class="header">${hint.title}</div><div class="description">${hint.content}</div>`,
                                autoShow     : true,
                                cls          : 'b-hint',
                                textContent  : true
                            }));
                        }
                    }, (i + 1) * 500);
                }
            }), delay);

        // Hide all hints on click anywhere, it also handles touch
        document.body.addEventListener('mousedown', this.destroyTooltips, true);

        //window.addEventListener('scroll', this.onWindowScroll, true);
    }

    // NOTE: this was commented out since it has negative effect on scrolling performance
    // onWindowScroll(e) {
    //     if (!e.target.matches('[class^=b-resize-monitor]')) {
    //         this.destroyTooltips();
    //     }
    // }

    destroyTooltips() {
        const me = this;

        me.toolTips.forEach(tip => tip.destroy());
        me.toolTips.length = 0;
        me.preventHints = true;

        document.body.removeEventListener('mousedown', me.destroyTooltips, true);
        //window.removeEventListener('scroll', me.onWindowScroll, true);
    }

    loadHints() {
        AjaxHelper.get('meta/hints.json', { parseJson : true }).then(response => {
            this.hints = response.parsedJson;

            if (Object.keys(this.hints).length) this.hasHints = true;
            if (!localStorage.getItem(hintKey)) this.initHints();
        });
    }

    //endregion

    //region Description

    loadDescription() {
        const
            me     = this,
            button = me.infoButton,
            url    = `${isDemoBrowser ? '_shared/browser/' : ''}app.config.json`;

        AjaxHelper.get(url, { parseJson : true }).then(response => {
            const
                appConfig = response.parsedJson,
                themeInfo = DomHelper.themeInfo,
                locales   = [];

            Object.keys(me.localeManager.locales).forEach(key => {
                const locale = me.localeManager.locales[key];
                locales.push({ value : key, text : locale.desc, data : locale });
            });

            let localeValue       = me.localeManager.locale.localeName,
                storedLocaleValue = BrowserHelper.getLocalStorageItem('exampleLanguage'),
                themeCombo;

            // check that stored locale is actually available among locales for this demo
            if (storedLocaleValue && locales.some(l => l.key === storedLocaleValue)) localeValue = storedLocaleValue;

            // Leave as a config during app startup. `Button#get menu` will promote it to a widget
            // when the user clicks it.
            button.menu = {
                type   : 'popup',
                anchor : true,
                align  : 't100-b100',
                cls    : 'info-popup',
                width  : '22em',
                items  : [
                    {
                        type : 'widget',
                        html : `<div class="header">${appConfig.title}</div><div class="description">${appConfig.description}</div>`
                    }].concat(themeInfo && themes[themeInfo.name.toLowerCase()]
                    ? [themeCombo = {
                        type        : 'combo',
                        ref         : 'themeCombo',
                        placeholder : me.L('Select theme'),
                        editable    : false,
                        value       : StringHelper.capitalizeFirstLetter(BrowserHelper.getLocalStorageItem('bryntumExampleTheme') || defaultTheme),
                        items       : themes,
                        onAction    : ({ value }) => {
                            me.applyTheme(value);
                            button.menu.hide();
                        }
                    }] : []).concat([
                    {
                        type        : 'combo',
                        ref         : 'localeCombo',
                        placeholder : me.L('Select locale'),
                        editable    : false,
                        items       : locales,
                        value       : localeValue,
                        onAction    : ({ value }) => {
                            me.localeManager.applyLocale(value);
                            Toast.show(me.L('Locale changed'));
                            button.menu.hide();
                        }
                    }]).concat(isDemoBrowser ? [] : [
                    {
                        type        : 'combo',
                        ref         : 'sizeCombo',
                        placeholder : me.L('Select size'),
                        editable    : false,
                        hidden      : productName === 'scheduler',
                        items       : [
                            { text : me.L('Full size'), value : 'b-size-full' },
                            { text : me.L('Phone size'), value : 'b-size-phone' }
                        ],
                        value    : 'b-size-full',
                        onAction : ({ value }) => {
                            if (me.curSize) document.body.classList.remove(me.curSize);
                            document.body.classList.add(value);
                            document.body.classList.add('b-change-size');
                            setTimeout(() => document.body.classList.remove('b-change-size'), 400);
                            me.curSize = value;
                            button.menu.hide();
                            // TODO: should remove this at some point
                            //     window.addEventListener('resize', me.onResize);
                            //     me.onResize();
                        }
                    },
                    {
                        type     : 'button',
                        ref      : 'hintButton',
                        text     : me.L('Display hints'),
                        cls      : 'b-blue b-raised',
                        onAction : () => {
                            button.menu.hide();
                            me.preventHints = false;
                            me.initHints();
                        }
                    },
                    {
                        type     : 'checkbox',
                        ref      : 'hintCheck',
                        text     : me.L('Automatically'),
                        cls      : 'b-blue',
                        flex     : '0 1 auto',
                        tooltip  : me.L('Check to automatically display hints when loading the example'),
                        checked  : !localStorage.getItem(hintKey),
                        onAction : ({ checked }) => {
                            if (checked) {
                                localStorage.removeItem(hintKey);
                            }
                            else {
                                localStorage.setItem(hintKey, true);
                            }
                        }
                    }
                ]),
                listeners : {
                    beforeShow() {
                        const popup = this;

                        themeCombo = popup.widgetMap.themeCombo;
                        if (!isDemoBrowser) {
                            if (!me.hasHints) {
                                popup.widgetMap.hintButton.hide();
                                popup.widgetMap.hintCheck.hide();
                            }
                            else {
                                popup.widgetMap.hintButton.show();
                                popup.widgetMap.hintCheck.show();
                            }
                        }
                    }
                }
            };

            // React to theme changes
            GlobalEvents.on({
                theme : ({ theme, prev }) => {
                    theme = theme.toLowerCase();

                    themeCombo.value = theme;
                    BrowserHelper.setLocalStorageItem('bryntumExampleTheme', theme);
                    document.body.classList.add(`b-theme-${theme}`);
                    document.body.classList.remove(`b-theme-${prev}`);

                    me.prevTheme = prev;

                    me.trigger('theme', { theme, prev });
                },
                // call before other theme listeners
                prio : 1
            });
        });
    }

    //endregion

    //region QueryString

    qs(key, defaultValue = null) {
        const regexp  = new RegExp(`(?:\\?|&)${key}=([^&]*)`),
            matches = document.location.href.match(regexp);

        if (!matches) return defaultValue;

        return matches[1];
    }

    //endregion

    //region Theme applying

    applyTheme(newThemeName, initial = false) {
        const { body } = document;

        newThemeName = newThemeName.toLowerCase();

        // only want to block transition when doing initial apply of theme
        if (initial) {
            body.classList.add('b-notransition');
        }

        DomHelper.setTheme(newThemeName).then(() => {
            // display after loading theme to not show initial transition from default theme
            document.body.classList.remove('b-initially-hidden');
            if (isDemoBrowser) {
                document.body.style.visibility = 'visible';
            }

            if (initial) {
                body.classList.add(`b-theme-${newThemeName}`);
                setTimeout(() => {
                    body.classList.remove('b-notransition');
                }, 100);
            }
        });
    }

    get themeInfo() {
        return DomHelper.themeInfo || { name : defaultTheme };
    }

    get theme() {
        return this.themeInfo.name;
    }

    // Utility method for when creating thumbs.
    // Eg: shared.fireMouseEvent('mouseover', document.querySelector('.b-task-rollup'));
    fireMouseEvent(type, target) {
        const
            targetRect = Rectangle.from(target),
            center     = targetRect.center;

        target.dispatchEvent(new MouseEvent(type, {
            clientX : center.x,
            clientY : center.y,
            bubbles : true
        }));
    }

    //endregion

    // region RootCause

    // Shared RootCause code for frameworks should be updated here scripts/grunt/tasks/templates/rootcause.ejs

    initRootCause() {
        const
            recordVideo       = location.search.includes('video=1'),
            disabled          = disableRootCause.some(exclude => location.href.includes(exclude)),
            isExcluded        = !recordVideo && (disabled || isDemoBrowser),
            isRootCauseReplay = (() => {
                try {
                // eslint-disable-next-line no-unused-vars
                    const a = window.top.location.href;
                }
                catch (e) {
                    return true;
                }
                return false;
            })();

        if ((isOnline || isRootCauseReplay) && !isExcluded && !isSiesta) {
            const script = document.createElement('script');

            script.async = true;
            script.crossOrigin = 'anonymous';
            script.src = 'https://app.therootcause.io/rootcause-full.js';
            script.addEventListener('load', this.startRootCause);

            document.head.appendChild(script);
        }
    }

    startRootCause() {
        const appIds       = {
                grid      : '9ea6c8f84f179d4c4b7be11ff217bc29367357f8',
                scheduler : '3dcfabf52d4fa704fb95259a317c72a6ce376313',
                gantt     : '9df03cbdc00b455de8bfe58d831e6fd76cc8881e'
            },
            //suiteRe     = /\/examples\/([a-z]+)/,
            product      = productName, //location.href.match(suiteRe) && location.href.match(suiteRe)[1] || 'grid',
            appId        = appIds[product] || 'unknown',
            version      = VersionHelper.getVersion(product),
            recordEvents = !('ontouchstart' in document.documentElement), // Skip event recording on touch devices as RC could cause lag
            recordVideo  = location.search.includes('video=1');

        if (!window.RC) {
            console.log('RootCause not initialized');
            return;
        }

        // eslint-disable-next-line no-undef
        window.logger = new RC.Logger({
            captureScreenshot               : true,
            recordUserActions               : recordEvents && !location.href.match('bigdataset'),
            logAjaxRequests                 : true,
            applicationId                   : appId,
            maxNbrLogs                      : isOnline ? 1 : 0,
            autoStart                       : isOnline,
            treatFailedAjaxAsError          : true,
            // enableArgumentsCapturing        : true,
            treatResourceLoadFailureAsError : true,
            showFeedbackButton              : isOnline,
            recordSessionVideo              : recordVideo,
            showIconWhileRecording          : {
                tooltip : 'NOTE: This session is being recorded for debugging purposes'
            },
            recorderConfig : {
                recordScroll             : BrowserHelper.isChrome, // quite big overhead for this in FF
                // Ignore our own auto-generated ids since they are not stable
                shouldIgnoreDomElementId : (id) => /^(b_|b-)/.test(id),
                ignoreCssClasses         : [
                    'b-sch-event-hover',
                    'b-contains-focus',
                    'b-hover',
                    'b-dirty',
                    'b-focused'
                ]
            },
            version              : version,
            ignoreErrorMessageRe : /Script error|Unexpected token var|ResizeObserver/i,
            ignoreFileRe         : /^((?!bryntum).)*$/ // Ignore non-bryntum domain errors
        });

        // Abort early error listener
        window.removeEventListener('error', errorListener);

        if (earlyErrorEvent) {
            window.logger.logException(earlyErrorEvent.error);
        }
    }

    // endregion
}

const
    keywords  = [
        'import', 'if', 'switch', 'else', 'var', 'const', 'let', 'delete', 'true', 'false', 'from', 'return', 'new',
        'function', '=>', 'class', 'get', 'set', 'break', 'return', 'export', 'default', 'static', 'extends'
    ],
    jsSyntax  = {
        string  : /'.*?'|`.*?`|".*?"/g,
        comment : /[^"](\/\/.*)/g,
        keyword : new RegExp(keywords.join('[ ;,\n\t]|[ ;,\n\t]'), 'g'),
        tag     : /&lt;.*?&gt;/g,
        curly   : /[{}[\]()]/g
    },
    cssSyntax = {
        keyword : /^\..*\b/gm,
        string  : /:(.*);/g
    };

class CodeEditor extends Popup {
    static get defaultConfig() {
        return {
            autoClose  : false,
            autoShow   : false,
            scrollable : true,
            closable   : true,

            hideAnimation : {
                right : {
                    from     : 0,
                    to       : 0,
                    duration : '.3s',
                    delay    : '0s'
                }
            },

            showAnimation : {
                right : {
                    from     : 0,
                    to       : 0,
                    duration : '.3s',
                    delay    : '0s'
                }
            },

            title : '<i class="b-fa b-fa-code"></i> ' + this.L('Code editor'),

            codeCache : {},

            tools : {
                download : {
                    tooltip : this.L('Download code'),
                    html    : '<a class="b-fa b-fa-file-download" href=""></a>'
                }
            },

            tbar : [
                {
                    type     : 'combo',
                    ref      : 'filesCombo',
                    editable : false,
                    value    : isModule ? 'app.module.js?437987' : isUmd ? 'app.umd.js?437987' : 'app.js?437987',
                    items    : [
                        isModule ? 'app.module.js?437987' : isUmd ? 'app.umd.js?437987' : 'app.js?437987'
                    ],
                    style    : 'margin-right: .5em',
                    onChange : 'up.onFilesComboChange'
                },
                {
                    type     : 'checkbox',
                    label    : this.L('Auto apply'),
                    ref      : 'autoApply',
                    checked  : true,
                    onAction : 'up.onAutoApplyAction'
                },
                {
                    type     : 'button',
                    text     : this.L('Apply'),
                    icon     : 'b-fa b-fa-sync-alt',
                    ref      : 'applyButton',
                    disabled : true,
                    onAction : 'up.applyChanges'
                }
            ],

            bbar : [
                {
                    type : 'widget',
                    ref  : 'status',
                    html : 'Idle'
                }
            ]
        };
    }

    construct(config) {
        super.construct(config);

        const me = this;

        me.update = me.buffer('applyChanges', isOnline ? 1500 : 250);

        new ResizeHelper({
            targetSelector : '.b-codeeditor',
            rightHandle    : false,
            skipTranslate  : true,
            minWidth       : 190,
            listeners      : {
                resizeStart() {
                    me.resizing = true;
                },
                resize() {
                    me.resizing = false;
                },
                thisObj : me
            }
        });
    }

    get bodyConfig() {
        const result = super.bodyConfig;

        result.children = [{
            tag      : 'pre',
            children : [{
                tag       : 'code',
                reference : 'codeElement'
            }]
        }];

        return result;
    }

    show() {
        this.showAnimation.right.from = `-${this.width}px`;
        document.body.style.paddingRight = `${this.width}px`;
        return super.show();
    }

    hide() {
        this.hideAnimation.right.to = `-${this.width}px`;
        document.body.style.paddingRight = 0;
        return super.hide();
    }

    onHide() {
        shared.codeButton.pressed = false;
    }

    onElementResize(resizedElement, lastRect, myRect) {
        super.onElementResize(resizedElement, lastRect, myRect);
        if (this.resizing) {
            document.body.style.transition = 'none';
            document.body.style.paddingRight = `${this.width}px`;
            requestAnimationFrame(() => {
                document.body.style.transition = '';
            });
        }
    }

    processJS(code) {
        // Html encode tags used in strings
        code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Wrap keywords etc in !keyword!
        Object.keys(jsSyntax).forEach(type => {
            code = code.replace(jsSyntax[type], `§${type}§$&</span>`);
        });

        // Replace wrap from above with span (needs two steps to not think class="xx" is a keyword, etc)
        code = code.replace(/§(.*?)§/g, '<span class="$1">');

        return code;
    }

    processCSS(css) {
        // Wrap keywords etc in !keyword!
        Object.keys(cssSyntax).forEach(type => {
            css = css.replace(cssSyntax[type], (match, p1) => {
                // RegEx with group, use matched group
                if (typeof p1 === 'string') {
                    return match.replace(p1, `§${type}§${p1}</span>`);
                }
                // No group, use entire match
                else {
                    return `§${type}§${match}</span>`;
                }
            });
        });

        // Replace wrap from above with span (needs two steps to not think class="xx" is a keyword, etc)
        css = css.replace(/§(.*?)§/g, '<span class="$1">');

        return css;
    }

    onCloseClick() {
        this.hide();
    }

    onFilesComboChange({ value }) {
        this.loadCode(value);
    }

    onAutoApplyAction({ checked }) {
        this.widgetMap.applyButton.disabled = checked;

        if (checked) {
            this.applyChanges();
        }
    }

    applyChanges() {
        switch (this.mode) {
            case 'js':
                this.updateJS();
                break;

            case 'css':
                this.updateCSS();
                break;
        }

        this.updateDownloadLink();
    }

    updateCSS() {
        const me = this;

        if (!me.cssElement) {
            me.cssElement = DomHelper.createElement({
                parent : document.head,
                tag    : 'style',
                type   : 'text/css'
            });
        }

        me.codeCache[me.filename] = me.cssElement.innerHTML = me.codeElement.innerText;
    }

    async updateJS() {
        const
            me               = this,
            code             = me.codeElement.innerText + '\nexport default null;\n',
            // Elements added by demo code
            renderedElements = new Set(document.querySelectorAll('[data-app-element=true]')),
            // Widgets added by demo code
            renderedWidgets  = new Set();

        me.codeCache[me.filename] = me.codeElement.innerText;

        // Store all current uncontained widgets to be able to cleanup on import fail. If the import fails because of a
        // syntax error some code might have executed successfully and we might get unwanted widgets rendered
        DomHelper.forEachSelector('.b-widget.b-outer', element => {
            const widget = IdHelper.fromElement(element, 'widget');
            if (widget !== this) {
                renderedWidgets.add(widget);
            }
        });

        try {
            me.status = '<i class="b-icon b-icon-spinner">Applying changes';

            // Keeping comment out code around in case we need it to later on support multi module editing
            // // Post to store in backend session
            // const response = await AjaxHelper.post(`../_shared/module.php?file=${me.filename}`, code, { parseJson : true });
            //
            // // Safari doesn't send cookies in import requests, so we extract it and
            // // pass it as part of the URL.
            // if (!me.phpSessionId) {
            //     me.phpSessionId = /PHPSESSID=([^;]+)/.exec(document.cookie)[1];
            // }
            //
            // if (response.parsedJson.success) {

            const
                imports   = code.match(/import .*/gm),
                pathParts = document.location.pathname.split('/'),
                base      = `${document.location.protocol}//${document.location.host}`;

            let rewrittenCode = code;

            // Rewrite relative imports as absolute, to work with createObjectURL approach below

            imports && imports.forEach(imp => {
                const parts = imp.split('../');
                if (parts.length) {
                    const
                        // ../_shared needs Grid/examples, while ../../lib needs Grid/
                        absolute  = pathParts.slice().splice(0, pathParts.length - parts.length).join('/'),
                        // import xx from 'http://lh/Grid/lib...'
                        statement = `${parts[0]}${base}${absolute}/${parts[parts.length - 1]}`;

                    rewrittenCode = rewrittenCode.replace(imp, statement);
                }
            });

            // Retrieve module from session. Wrapped in eval() to hide it from FF, it refuses to load otherwise
            // eslint-disable-next-line no-eval,no-template-curly-in-string
            //await eval(`import('./module.php?file=${me.filename}&dt=${new Date().getTime()}&token=${me.phpSessionId}')`);

            // Retrieve module from object url. Wrapped in eval() to hide it from FF, it refuses to load otherwise
            const objectUrl = URL.createObjectURL(new Blob([rewrittenCode], { type : 'text/javascript' }));
            // eslint-disable-next-line no-eval
            await eval(`import(objectUrl)`);
            URL.revokeObjectURL(objectUrl);

            document.body.style.paddingRight = `${this.width}px`;

            DomHelper.removeEachSelector(document, '#tools > .remove-widget');

            me.widgetMap.applyButton.disable();

            // Destroy pre-existing demo tools, grids etc. after the import, to lessen flickering
            renderedWidgets.forEach(widget => !widget.isDestroyed && !widget.keep && widget.destroy());

            // Destroy any additional elements added by the demo
            renderedElements.forEach(element => element.remove());

            // If we have gotten this far the code is valid
            me.element.classList.remove('invalid');
            me.title = '<i class="b-fa b-fa-fw b-fa-code"></i> ' + me.L('Code editor');
            me.status = 'Idle';
            // }
        }
        catch (e) {
            // Exception, either some network problem or invalid code
            me.title = '<i class="b-fa b-fa-fw b-fa-skull"></i> ' + me.L('Code editor');
            me.element.classList.add('invalid');
            me.status = e.message;

            // Remove any widgets created by the failed import (might have successfully added some)
            DomHelper.forEachSelector('.b-widget', element => {
                const widget = IdHelper.fromElement(element);
                // Only care about top level components
                if (widget && !widget.isDestroyed && !widget.owner && !renderedWidgets.has(widget)) {
                    widget.destroy();
                }
            });
        }
    }

    async loadCode(filename = isModule ? 'app.module.js?437987' : isUmd ? 'app.umd.js?437987' : 'app.js?437987') {
        const me = this;

        let code      = me.codeCache[filename],
            exception = null;

        me.filename = filename;

        if (!code) {
            try {
                const response = await AjaxHelper.get(location.href.replace(/[^/]*$/, '') + filename);
                code = me.codeCache[filename] = await response.text();
            }
            catch (e) {
                code = '';
                exception = e;
            }
        }

        me.loadedCode = code;

        if (filename.endsWith('.js?437987')) {
            me.mode = 'js';
            code = me.processJS(code);
        }
        else if (filename.endsWith('.css?437987')) {
            me.mode = 'css';
            code = me.processCSS(code);
        }

        me.codeElement.innerHTML = code;
        me.status = `${exception ? exception.message : 'Idle'}`;

        me.toggleReadOnly();
        me.updateDownloadLink();

        me.contentElement.querySelector('code').setAttribute('spellcheck', 'false');
    }

    get focusElement() {
        return this.codeElement;
    }

    set status(status) {
        this.widgetMap.status.html = status;
    }

    updateDownloadLink() {
        let { downloadLink } = this;

        if (!downloadLink) {
            downloadLink = this.downloadLink = this.tools.download.element.firstElementChild;
        }

        downloadLink.download = this.filename;
        downloadLink.href = `data:text/${this.filename.endsWith('.css?437987') ? 'css' : 'javascript'};charset=utf-8,${escape(this.codeElement.innerText)}`;
    }

    get supportsImport() {
        if (!this.hasOwnProperty('_supportsImports')) {
            try {
                eval('import(\'../_shared/dummy.js\')'); // eslint-disable-line no-eval
                this._supportsImports = true;
            }
            catch (e) {
                this._supportsImports = false;
            }
        }
        return this._supportsImports;
    }

    toggleReadOnly() {
        const
            me                            = this,
            { widgetMap, contentElement } = me,
            readOnly                      = me.mode === 'js' && (me.hasImports || isUmd || !me.supportsImport);

        if (readOnly) {
            contentElement.classList.add('readonly');
            widgetMap.applyButton.disabled = true;
            widgetMap.autoApply.disabled = true;
            me.status = '<i class="b-fa b-fa-lock" /> Read only' + (!me.supportsImport ? ' (try it on Chrome or Firefox)' : '');
        }
        else {
            contentElement.classList.remove('readonly');
            widgetMap.autoApply.disabled = false;
            me.status = 'Idle';
        }

        // Have not figured out any easy way of editing additional modules, read only for now.
        // Ticket to resolve : https://app.assembla.com/spaces/bryntum/tickets/8429
        contentElement.querySelector('code').setAttribute('contenteditable', !readOnly);
    }

    // Find all imports in the code, extracting their filename to populate combo with
    extractImports(code) {
        const
            regex   = /'\.\/(.*)';/g,
            imports = [];

        let result;

        while ((result = regex.exec(code)) !== null) {
            imports.push(result[1]);
        }

        return imports;
    }

    static async addToPage(button) {
        const
            editor                        = new CodeEditor({
                owner    : button,
                appendTo : Widget.floatRoot
            }),
            { widgetMap, contentElement } = editor,
            filesStore                    = widgetMap.filesCombo.store;

        editor.element.style.right = `-${editor.width}px`;
        IdHelper.disableThrow = true;

        await editor.loadCode();

        // Populate combo with imports. If we have imports, editing will be disabled for now #8429
        const imports = editor.extractImports(editor.loadedCode);
        filesStore.add(imports.map(file => ({ text : file, value : file })));
        editor.hasImports = imports.length > 0;

        editor.toggleReadOnly();

        // Include css in combo
        if (document.head.querySelector('[href$="app.css?437987"]')) {
            filesStore.add({ text : 'resources/app.css?437987', value : 'resources/app.css?437987' });
        }

        // Only show combo if it has multiple items, no point otherwise :)
        widgetMap.filesCombo[filesStore.count > 1 ? 'show' : 'hide']();

        EventHelper.on({
            element : contentElement,
            input() {
                if (widgetMap.autoApply.checked) {
                    editor.update();
                }
                else {
                    widgetMap.applyButton.enable();
                }
            },
            keydown(event) {
                if (event.key === 'Enter') {
                    document.execCommand('insertHTML', false, '<br>');
                    event.preventDefault();
                }
            },
            thisObj : editor
        });

        return editor;
    }
}

//<debug>
// lazy debugging
setTimeout(async() => {
    window.grid = bryntum.query('grid', true) || bryntum.query('treegrid', true);
    window.scheduler = bryntum.query('scheduler', true);
    window.gantt = bryntum.query('gantt', true);

    if ((window.grid || window.scheduler || window.gantt) && !isDemoBrowser) {
        shared.codeButton.show();
    }

    // Show code editor
    if (document.location.search.match(/[?&]code/)) {
        shared.codeEditor = await CodeEditor.addToPage(shared.codeButton);
        shared.codeButton.pressed = true;
        shared.codeEditor.show().then(() => {
            shared.codeEditor.focus();
        });
    }
}, 100);
//</debug>

const shared = new Shared();

// ugly, but needed for bundled demo browser to work
window.shared = shared;

export default shared;
