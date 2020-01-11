/**
 * The App file. It should stay as simple as possible
 */

// libraries
import React from 'react';

// our stuff
import 'bryntum-gantt/gantt.stockholm.css';
import 'bryntum-react-shared/resources/shared.scss';
import './App.scss';
import Main from './containers/Main';

const app = props => (<Main />);

export default app;

// eof
