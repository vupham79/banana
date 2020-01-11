import { TaskEditor } from '../../build/gantt.module.js?437987';

StartTest(t => {

    // https://app.assembla.com/spaces/bryntum/tickets/9253
    t.it('Should be possible create 2 editors with the same tab disabled', t => {
        t.livesOk(() => {
            new TaskEditor({
                tabsConfig : { notestab : false }
            });

            new TaskEditor({
                tabsConfig : { notestab : false }
            });
        });
    });

});
