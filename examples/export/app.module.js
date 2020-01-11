import { Gantt, ProjectModel, WidgetHelper, ProjectGenerator, DateHelper } from '../../build/gantt.module.js?437987';
import shared from '../_shared/shared.module.js?437987';
/* eslint-disable no-unused-vars */


//<debug>
// disable certain debugging code to make record generation faster
window.bryntum.DISABLE_DEBUG = true;
//</debug>

let gantt,
    project = window.project = new ProjectModel();

const [taskCountField, projectSizeField] = WidgetHelper.append([
    {
        ref     : 'taskCountField',
        type    : 'number',
        label   : 'Tasks',
        tooltip : 'Enter number of tasks to generate and press [ENTER]. Tasks are divided into blocks of ten',
        value   : 50,
        min     : 10,
        max     : 10000,
        width   : 180,
        step    : 10,
        onChange({ userAction }) {
            gantt.generateDataset();
        }
    },
    {
        ref     : 'projectSizeField',
        type    : 'number',
        label   : 'Project size',
        tooltip : 'Enter number of tasks that should be connected into a "project" (multipliers of 10)',
        min     : 10,
        max     : 1000,
        value   : 10,
        width   : 180,
        step    : 10,
        onChange({ userAction }) {
            gantt.generateDataset();
        }
    },
    {
        ref   : 'exportButton',
        type  : 'button',
        color : 'b-orange b-raised',
        text  : 'Export',
        onClick() {
            gantt.features.pdfExport.showExportDialog();
        }
    }
], {
    insertFirst : document.getElementById('tools') || document.body,
    cls         : 'b-bright'
});

const headerTpl = ({ currentPage, totalPages }) => `
    <div class="demo-export-header">
        <img src="resources/logo.png"/>
        <dl>
            <dt>Date: ${DateHelper.format(new Date(), 'll LT')}</dt>
            <dd>${totalPages ? `Page: ${currentPage + 1}/${totalPages}` : ''}</dd>
        </dl>
    </div>`;

const footerTpl = () => '<div class="demo-export-footer"><h3>© 2020 Bryntum AB</h3></div>';

gantt = new Gantt({
    // We don't need to export demo header
    appendTo : 'container',

    emptyText : '',

    project,

    columns : [
        { type : 'name', field : 'name', text : 'Name', width : 200 },
        { type : 'startdate', text : 'Start date' },
        { type : 'duration', text : 'Duration' }
    ],

    columnLines : false,
    
    features : {
        pdfExport : {
            exportServer            : 'http://localhost:8080/',
            translateURLsToAbsolute : 'http://localhost:8080/resources/',
            headerTpl,
            footerTpl
        }
    },

    async generateDataset() {
        taskCountField.disabled = projectSizeField.disabled = true;

        const
            mask   = this.mask('Generating project'),
            config = await ProjectGenerator.generateAsync(taskCountField.value, projectSizeField.value, (count) => {
                mask.text = `Generating tasks: ${count}/${taskCountField.value}`;
            });

        this.setTimeSpan(config.startDate, config.endDate);

        mask.text = 'Calculating schedule';

        // Required to allow browser to update DOM before calculation starts
        this.requestAnimationFrame(async() => {
            project.startDate = config.startDate;
            project.endDate = config.endDate;
            project.taskStore.data = config.tasksData;
            project.dependencyStore.data = config.dependenciesData;

            await project.propagate();

            this.unmask();
            taskCountField.disabled = projectSizeField.disabled = false;
        });
    }
});

gantt.generateDataset();
