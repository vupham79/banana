import { AjaxHelper, DomHelper, EventHelper, WidgetHelper, Scroller, Popup, GlobalEvents, VersionHelper, StringHelper } from '../../../build/gantt.module.js?437987';
import shared from '../../_shared/shared.module.js?437987';
/* eslint-disable no-new */
// TODO: convert to ES6. Originally wanted to avoid babeling both doing that now anyway so...


class ExamplesApp {
    constructor() {
        const
            me = this,
            product = StringHelper.capitalizeFirstLetter(shared.productName),
            version = VersionHelper.getVersion(shared.productName);

        me.examples = window.examples || [];

        me.currentTipLoadPromiseByURL = {};

        // remove prerendered examples
        me.examplesContainerEl = document.getElementById('scroller');
        me.examplesContainerEl.innerHTML = '';

        document.body.classList.add(shared.theme);

        document.getElementById('title').innerHTML = `Bryntum ${product} ${version}`;

        GlobalEvents.on({
            theme() {
                document.body.classList.remove(shared.prevTheme);
                document.body.classList.add(shared.theme);
                if (me.rendered) me.updateThumbs();
            }
        });

        me.isOnline = /bryntum.com|^lh$|^local$/.test(location.host);
        me.buildTip = me.isOnline ? 'This demo is not viewable online, but included when you download the trial. ' : 'This demo needs to be built before it can be viewed. ';

        // Do not display documentation button online, paths will be wrong
        if (!me.isOnline) {
            WidgetHelper.append([
                {
                    type    : 'button',
                    text    : 'Documentation',
                    icon    : 'b-fa b-fa-question',
                    cls     : 'b-blue b-raised',
                    style   : 'margin-right: 1em',
                    onClick : () => document.location = '../docs'
                }
            ], {
                insertFirst : document.getElementById('tools') || document.body,
                cls         : 'b-bright'
            });
        }

        if (location.search.match('prerender')) {
            me.embedDescriptions().then(me.render.bind(me));
        }
        else {
            me.render();
        }
        if (location.hash) {
            const exampleId = window.location.hash.split('#')[1];

            if (exampleId) {
                const exampleThumb = document.getElementById(exampleId);

                if (exampleThumb) {
                    const scrollable = new Scroller({
                        element : exampleThumb.closest('#scroller')
                    });
                    scrollable.scrollIntoView(exampleThumb, {
                        animate   : true,
                        highlight : true,
                        focus     : true
                    });
                }
            }
        }
    }

    onCloseClick() {
        document.getElementById('intro').style.maxHeight = '0';
    }

    updateThumbs() {
        // replace thumb with new theme
        Array.from(document.querySelectorAll('.image img')).forEach(img => {
            img.src = img.src.replace(/thumb\..*?\.png/, `thumb.${shared.theme}.png`.toLowerCase());
        });
    }

    template(data) {
        const theme = shared.theme,
            version = VersionHelper.getVersion(shared.productName),
            isNew = example => (version && example.since && version.startsWith(example.since)),
            isUpdated = example => (version && example.updated && version.startsWith(example.updated));

        return data.examples.map(example => {
            // Show build popup for examples marked as offline and for those who need building when demo browser is offline
            const hasPopup = (example.build && !this.isOnline) || example.offline;
            return `${example.firstInGroup ? `
                <h2 id="${example.group}" class="group-header ${example.group}">${example.group}</h2>
                <section class="examples">
                ` : ''}
                <a
                    class="example ${isNew(example) ? 'new' : ''} ${isUpdated(example) ? 'updated' : ''}"
                    id="${example.folder}"
                    href="${example.folder}"
                    ${hasPopup ? `data-popup="${example.folder}"` : ''}
                    >
                    <div class="image">
                        <img src="${example.folder}/meta/thumb.${theme.toLowerCase()}.png" alt="${example.tooltip || example.title || ''}">
                        <i class="${hasPopup ? 'tooltip b-fa b-fa-cog build' : 'tooltip b-fa b-fa-info'}"></i>
                        ${example.version ? `<div class="version">${example.version}</div>` : ''}
                    </div>
                    <label class="title">${example.title}</label>
                </a>
                ${example.lastInGroup ? '</section>' : ''}
            `;
        }).join('');
    }

    render() {
        const me                        = this,
            examples                  = me.examples,
            groupOrder                = {
                'Basic'               : 0,
                'Intermediate'        : 1,
                'Advanced'            : 2,
                'Integration'         : 3,
                'Integration/Angular' : 4,
                'Integration/React'   : 5,
                'Integration/Vue'     : 6
            };

        if (me.examplesContainerEl.children.length === 0) {
            examples.sort((a, b) => {
                let first  = groupOrder[a.group] + a.title.trim(),
                    second = groupOrder[b.group] + b.title.trim();

                if (first < second) return -1;
                if (first > second) return 1;

                return 0;
            });

            let group = '', last = null;
            examples.forEach(r => {
                if (r.group !== group) {
                    group = r.group;
                    r.firstInGroup = true;
                    if (last) last.lastInGroup = true;
                }
                last = r;
            });

            me.examplesContainerEl.innerHTML = me.template({ examples });
        }
        else {
            // We need this to correctly process thumbs in Edge
            me.updateThumbs();
        }

        // A singleton tooltip which displays example info on hover of (i) icons.
        WidgetHelper.attachTooltip(me.examplesContainerEl, {
            forSelector  : 'i.tooltip',
            header       : true,
            scrollAction : 'realign',
            textContent  : true,
            getHtml      : ({ tip }) => {
                const activeTarget = tip.activeTarget;

                if (activeTarget.dataset['tooltip']) {
                    tip.titleElement.innerHTML = activeTarget.dataset['tooltipTitle'];
                    return activeTarget.dataset['tooltip'];
                }

                const url = `${activeTarget.closest('a').href}/app.config.json`;

                // Cancel all ongoing ajax loads (except for the URL we are interested in)
                // before fetching tip content
                for (const u in me.currentTipLoadPromiseByURL) {
                    if (u != url) {
                        me.currentTipLoadPromiseByURL[u].abort();
                    }
                }

                // if we don't have ongoing requests to the URL
                if (!me.currentTipLoadPromiseByURL[url]) {
                    const requestPromise = me.currentTipLoadPromiseByURL[url] = AjaxHelper.get(url, { parseJson : true });

                    requestPromise.then(response => {
                        let json = response.parsedJson;
                        activeTarget.dataset['tooltipTitle'] = tip.titleElement.innerHTML = json.title.replace(/[\n\r]/g, '');
                        activeTarget.dataset['tooltip'] = tip.html = json.description.replace(/[\n\r]/g, '') +
                            ((/build/.test(activeTarget.className)) ? `<br><b>${me.buildTip}</b>` : '');
                        tip.realign();
                        delete me.currentTipLoadPromiseByURL[url];
                    }).catch(function(reason) {
                        // Ajax request aborted
                    });
                }

                return false;
            }
        });

        document.getElementById('intro').style.display = 'block';
        document.getElementById('close-button').addEventListener('click', me.onCloseClick.bind(me));

        EventHelper.on({
            element : me.examplesContainerEl,
            click(event) {
                const el = DomHelper.up(event.target, '[data-popup]');
                new Popup({
                    forElement   : el,
                    header       : '<i class="b-fa b-fa-info-circle"></i> ' + (me.isOnline ? 'Download needed' : 'Needs building'),
                    html         : me.buildTip + `Browse to <b>examples/${el.dataset.popup}</b> to find it`,
                    closeAction  : 'destroy',
                    width        : '18em',
                    anchor       : true,
                    scrollAction : 'realign'
                });
                event.preventDefault();
            },
            delegate : '[data-popup]'
        });

        const demoDiv      = document.getElementById('live-example'),
            widgetConfig = window.introWidget; // taken from `examples/_shared/data/examples.js`

        if (demoDiv && widgetConfig) {
            WidgetHelper.append(widgetConfig, 'live-example');
        }

        me.rendered = true;
    }

    embedDescriptions() {
        return new Promise((resolve) => {
            const me       = this,
                promises = me.examples.map(example => {

                    return AjaxHelper.get(example.folder + '/app.config.json', { parseJson : true }).then(response => {
                        if (response.parsedJson) {
                            example.tooltip = response.parsedJson.title + ' - ' +
                                response.parsedJson.description.replace(/[\n\r]/g, ' ').replace(/"/g, '\'');
                        }
                    });
                });

            Promise.all(promises).then(resolve);
        });
    }
}

new ExamplesApp();
