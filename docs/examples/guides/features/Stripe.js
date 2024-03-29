(function () {
const targetElement = document.querySelector('div[data-file="guides/features/Stripe.js"]');
if (!targetElement) return;

//START
let grid = new Grid({
    appendTo : targetElement,

    autoHeight: true,

    features : {
        // enable striping
        stripe : true
    },

    data : DataGenerator.generateData(3),

    columns : [
        { field : 'name', text : 'Name', flex : 1 },
        { field : 'team', text : 'Team', flex : 1 },
        { type: 'number', field : 'rank', text : 'Rank', flex : 1 }
    ]
});
//END
})();
