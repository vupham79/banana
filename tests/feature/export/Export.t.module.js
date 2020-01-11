import { AjaxHelper, DateHelper, Override, ProjectGenerator, RandomGenerator, Gantt, PresetManager, PaperFormat, Rectangle } from '../../../build/gantt.module.js?437987';

StartTest(t => {
    let gantt, paperHeight;
    
    Object.assign(window, {
        AjaxHelper,
        DateHelper,
        Override,
        ProjectGenerator,
        RandomGenerator,
        Gantt,
        PresetManager,
        PaperFormat,
        Rectangle
    });
    
    t.overrideAjaxHelper();
    
    t.beforeEach(() => {
        gantt && gantt.destroy();
    });
    
    t.it('Sanity', async(t) => {
        ({ gantt, paperHeight } = await t.createGanttForExport());
        
        let result, html;
        
        async function assertContent() {
            for (let i = 0; i < html.length; i++) {
                await new Promise(resolve => {
                    t.setIframe({
                        height : paperHeight + 50,
                        html   : html[i].html,
                        onload(doc, frame) {
                            t.ok(t.assertHeaderPosition(doc), `Header is exported ok on page ${i}`);
                            t.ok(t.assertFooterPosition(doc), `Footer is exported ok on page ${i}`);
                    
                            t.assertRowsExportedWithoutGaps(doc, false, true);
                    
                            t.ok(t.assertTicksExportedWithoutGaps(doc), `Ticks exported without gaps on page ${i}`);
                            t.isExportedTickCount(doc, gantt.timeAxis.count);
                            
                            t.ok(t.assertExportedGanttDependenciesList(doc, gantt.dependencies), `Dependencies are exported ok on page ${i}`);
                    
                            t.is(doc.querySelectorAll('.b-gantt-task-wrap').length, gantt.eventStore.count, 'All tasks exported');
                    
                            frame.remove();
                    
                            resolve();
                        }
                    });
                });
            }
        }
        
        t.chain(
            { waitForPropagate : gantt },
            { waitForSelector : '.b-sch-dependency' },
            async() => {
                t.diag('Using singlepage export');
    
                result = await gantt.features.pdfExport.export({
                    columns      : gantt.columns.visibleColumns.map(c => c.id),
                    exporterType : 'singlepage',
                    range        : 'completeview'
                });

                ({ html } = result.response.request.body);

                t.is(html.length, 1, '1 page is exported');

                await assertContent();
                
                t.diag('Using multipage export');

                result = await gantt.features.pdfExport.export({
                    columns      : gantt.columns.visibleColumns.map(c => c.id),
                    exporterType : 'multipage',
                    range        : 'completeview'
                });

                ({ html } = result.response.request.body);

                t.is(html.length, 1, '1 page is exported');

                await assertContent();
            }
        );
    });
});
