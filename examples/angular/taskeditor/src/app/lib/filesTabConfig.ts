/**
 * @author Saki
 * @date 2019-05-22 20:26:24
 * @Last Modified by: Saki
 * @Last Modified time: 2019-05-24 09:04:13
 */

export default {
    type : 'grid',
    title : 'Files',
    defaults : {
        labelWidth: 200
    }
    ,columns: [{
        text:'Files attached to task',
        field: 'name',
        type: 'template',
        template: (data : any) => `<i class="b-fa b-fa-fw b-fa-${data.record.data.icon}"></i>${data.record.data.name}`
    }], // eo columns

    loadEvent(eventRecord : any) {
        let files = [];

        for (let i = 0; i < Math.random() * 10; i++) {
            const nbr = Math.round(Math.random() * 5);

            switch (nbr) {
                case 1:
                    files.push({
                        name: `Image${nbr}.pdf`,
                        icon: 'image'
                    });
                    break;
                case 2:
                    files.push({
                        name: `Charts${nbr}.pdf`,
                        icon: 'chart-pie'
                    });
                    break;
                case 3:
                    files.push({
                        name: `Spreadsheet${nbr}.pdf`,
                        icon: 'file-excel'
                    });
                    break;
                case 4:
                    files.push({
                        name: `Document${nbr}.pdf`,
                        icon: 'file-word'
                    });
                    break;
                case 5:
                    files.push({
                        name: `Report${nbr}.pdf`,
                        icon: 'user-chart'
                    });
                    break;
            }
        }

        this.store.data = files;
        
    } // eo loadEvent

} // eo files tab

// eof
