/**
 * @author Saki
 * @date 2019-07-29 21:04:15
 * @Last Modified by: Saki
 * @Last Modified time: 2019-07-29 21:26:59
 */
import React from 'react';
import { Tools, FullscreenButton } from 'bryntum-react-shared';

const header = (props : object) => {

    return (
        <header className="demo-header">
            <div id="title-container">
                <a id="title" href=".">React Basic Gantt demo with TypeScript</a>
            </div>
            <Tools>
                <FullscreenButton container="tools"></FullscreenButton>
            </Tools>

        </header>
    );
}

export default header

// eof
