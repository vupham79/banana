StartTest(t => {
    let gantt;
    
    t.beforeEach(() => {
        gantt && gantt.destroy();
    });
    
    t.it('Should restore state', t => {
        gantt = t.getGantt({
            startDate : null,
            endDate   : null
        });
        
        let { startDate, endDate } = gantt;
        
        // eslint-disable-next-line no-self-assign
        gantt.state = gantt.state;
        
        t.is(gantt.startDate, startDate, 'Gantt start is ok');
        t.is(gantt.endDate, endDate, 'Gantt end is ok');
    });
});
