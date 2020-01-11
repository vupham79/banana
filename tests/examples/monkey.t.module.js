StartTest(t => {

    t.diag('Test PageURL: ' + t.scopeProvider.sourceURL);

    t.waitForSelector('.b-gantt-task', () => {
        function test() {
            t.pass('Gantt example rendered without exception');

            // Play external steps if provided in query string
            if (window.top.location.search.match('monkeyActions')) {
                t.forceTestVisible();

                let obj = window.top.location.search.split('&').reduce(function(prev, curr) {
                    const p = curr.split('=');

                    prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
                    return prev;
                }, {});

                t.chain(JSON.parse(obj.monkeyActions));
            }
            else {
                t.monkeyTest({
                    target          : '.b-gantt',
                    skipTargets     : ['#fullscreen-button', '.b-skip-test'],
                    nbrInteractions : 10,
                    callback        : function(actionLog) {
                        window.monkeyActions = actionLog;
                    }
                });
            }
        }

        if (document.querySelector('.x-messagebox')) {
            t.click('.x-messagebox .x-button', test);
        }
        else {
            test();
        }
    });
});
