/**
 * @author Saki
 * @date 2019-07-29 20:43:37
 * @Last Modified by: Saki
 * @Last Modified time: 2019-07-29 21:23:56
 */
import React from 'react';

// our libraries
import { BryntumGantt } from 'bryntum-react-shared';
// we import gantt.umd for IE11 compatibility only. If you don't use IE import:
// import { DomClassList, EventModel } from 'bryntum-gantt';
import { ProjectModel } from 'bryntum-gantt/gantt.umd.js';

// global css
import 'bryntum-gantt/gantt.stockholm.css';
import 'bryntum-react-shared/resources/shared.scss';

// application scss
import './App.scss';

// application files
import Header from './Header';
// import ganttConfig from './ganttConfig';

const App: React.FC = () => {

    const project = new ProjectModel({
      autoLoad : true,
      transport : {
        load : {
          url : 'data/launch-saas.json'
        }
      }
    });

    return (
        <React.Fragment>
            <Header/>
            <BryntumGantt
                    project={project}
                    columns={[
                        { type : 'name', field : 'name', width : 250 }
                    ]}
                    viewPreset="weekAndDayLetter"
                    barMargin={10}
                />
        </React.Fragment>
    );
}

export default App;

// eof