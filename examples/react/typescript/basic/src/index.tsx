/**
 * @author Saki
 * @date 2019-07-29 20:36:35
 * @Last Modified by: Saki
 * @Last Modified time: 2019-07-29 20:36:59
 */

// core-js polyfills are required for IE11 compatibility. If you don't use IE then delete them
import "core-js/stable";

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('container'));

// eof
