<h1 class="title-with-image"><img src="resources/images/react.png" alt="Bryntum Gantt supports React"/>Using Bryntum Gantt with React</h1>

The Gantt chart itself is framework agnostic, but it ships with demos to simplify using it with popular frameworks such as React. The purpose of this guide is to give you a basic introduction on how to use the Bryntum Gantt with React.

There are React demos that have been created  using <a href="https://github.com/facebook/create-react-app" target="_blank">create-react-app</a> script which run either in development mode or can be built for production. They are located in `examples/react/javascript` folder. The demos are ready for direct viewing (in production mode) here: <a href="../examples/#Integration/React" target="_blank">React Integration Examples</a>.

If you want to run an example locally in development mode change to its directory and run:

    npm install
    npm start

and then navigate to <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>. If you modify the example code while running it locally it is automatically re-built and updated in the browser allowing you to see your changes immediately.

You can also build the examples, or your own application, for production by running:

    npm install
    npm run build

The built production version is then located in `build` directory that can be deployed to your production server.

For more information on React, please visit <a href="https://reactjs.org/" target="_blank">reactjs.org</a>.

## Integrating Gantt with React
Although the Gantt is a very complex and sophisticated component, it is very easy to use. All the Gantt needs is:

1. a configuration object
2. an element to render to


### Gantt configuration
The recommended practice is to keep Gantt configuration in a separate file from which it is imported and passed to the Gantt constructor. The code would then look similar to the following:

```jsx
import { Gantt } from 'bryntum-gantt';
import ganttConfig from './ganttConfig.js';

ganttConfig.appendTo = 'container';

const gantt = new Gantt(ganttConfig);
```

where `ganttConfig.js` would contain configuration similar to the following:
```jsx
export default {
    startDate : '2019-06-20 08:00:00',
    project : new ProjectModel({
        transport       : {
            load : {
                url : '...'
            }
        }
    }),

    columns : [...]

    // other config options
}
```
To find out more about all the available configuration options of the Bryntum Gantt, please consult the <a href="#api">API docs</a>.

Note: `bryntum-gantt` is a locally installed package that contains Bryntum Gantt and all its other supporting widgets. See `package.json` of any example to understand how it is configured:
```json
"dependencies": {
    "bryntum-gantt": "file:../../../../build"
    ... other dependencies
}

```


### Rendering to an element
The Bryntum Gantt needs an existing HTML element to render into. It can be declared as `appendTo`, `insertBefore` or `insertFirst` property with values being either an HTMLElement instance or a string which is  the id of an element. The Gantt renders itself as the part of its instantiation if any of the above properties is specified in the config passed into constructor.

In the above example we assign `ganttConfig.appendTo = 'container'`, which is the id of the containing element, for example `<div id="container"></div>`.

If we do not want to render Gantt during instantiation you can omit the above properties and render the component manually at the appropriate time by passing the container to the `render` method. It would look like this:

```jsx
import Gantt from 'bryntum-gantt';
import ganttConfig from './ganttConfig.js'

// some other code...

const gantt = new Gantt(ganttConfig);

// some other code...

gantt.render('container');

```

The most common scenario is to render Gantt in the `componentDidMount` method if you use classes in your application or in the `useEffect` initial call if you use React hooks.

### Rendering in React component
The example of using Gantt in a React component is the following:
```jsx
import React, { Component } from 'react';
import Gantt from 'bryntum-gantt';
import ganttConfig from './ganttConfig'

class myGantt extends Component {
    componentDidMount() {
        const gantt = new Gantt({
            ...ganttConfig,
            appendTo: this.el
        });
        this.ganttEngine = gantt;
    }

    componentWillUnmount() {
        this.ganttEngine.destroy();
    }

    render() {
        return ('<div ref={el => this.el = el}></div>')
    }
}

export default myGantt;
```
Here we let React to create element we return from `render` method keeping the reference to it and when the element will become available in `componentDidMount` lifecycle method we configure and create Bryntum Gantt itself.

Keeping its reference in the class property `ganttEngine` is important for it's proper destroy in `componentWillUnmount` or in other methods of this class or for outside layers wishing to access the Gantt.

### Rendering in React Hooks
If you are using React Hooks then Gantt could be integrated as follows:

```jsx
import React, { useEffect, useRef } from 'react';
import { Gantt } from 'gantt';
import ganttConfig from './ganttConfig';

cont myGantt = props => {

    const elementRef = useRef(),
          ganttRef = userRef();

    useEffect(() => {
        ganttRef.current = new Gantt({
            ...ganttConfig,
            appendTo: elementRef.current
        });
        return () => {
            if(ganttRef.current) {
                ganttRef.current.destroy();
            }
        };
    }, []);

    return (
        <div ref={elementRef}></div>
    )
}

export default myGantt;
```

`useEffect` above will run only once on the component initialization (due to empty array [] passed as the second argument) and we create and render Gantt there. The function returned is run on component destroy.

### Updating properties at runtime
At this point we have Gantt properly configured and rendered on the the screen so now it is time to pass to it changes that may occur as results of user actions, if you need it.

As with rendering there are two possible scenarios: React Class Component and React Functional Component using hooks.

For Component, we would use `shouldComponentUpdate` function that is called by React when a component property changes. In the function we would analyze what has changed and what action to take: either to ignore the change if it is not related to Gantt or to pass it to `ganttEngine` by calling its method or assigning a new value to its property.

Do not forget to return `false` from this method to prevent React from destroying and re-rendering our Gantt.

For Functional Component we would call `useEffect` again, now with a list of properties as the second argument. Function passed as the first argument would then run whenever any of the listed properties changes when we would propagate this change down to `ganttRef.current`.

### Listening to Gantt events
The last missing piece is listening and reacting to events fired by the Gantt chart. For example, listening to selection change as the user clicks on tasks.

You can install listeners on Gantt by

* passing `listeners` config option
* calling `on` or `addListener` method

Listeners config could look similar to this:

```jsx
    listeners : {
        selectionchange : (event) {
            console.log(event);
        }
    }
```

The same effect can be achieved by calling `on` method on Gantt instance:

```jsx
ganttRef.current.on('selectionchange', (event) => {
    console.log(event);
})
```

## Using React as cell renderer
Bryntum Gantt column already supports configuration option [renderer](#Grid/column/Column#config-renderer) which is a function that receives rich parameters used as inputs to compose the resulting returned html. Any kind of conditional complex logic can be used to prepare a visually rich cell content.

Yet, there can be a situation when you already have a React component that implements the desired cell visualizations and re-writing its functionality as the renderer function would only be superfluous work.

It is now possible to use JSX that can refer also to React components as a cell renderer. The support is implemented in the `BryntumGantt` wrapper therefore the wrapper must be used for the JSX renderers to work.

### Using simple inline JSX

Using inline JSX is as simple as the following:

```jsx
renderer: ({ value }) => <b>{value}</b>
```

If you also need to access other data fields, you can do it this way:

```jsx
renderer: (renderData) => <div><b>{renderData.value}</b>/{renderData.record.role}</div>
```

_**Note:** Mind please that the above functions return html-like markup without quotes. That makes the return value JSX and it is understood and processed as such. If you enclose the markup in quotes it will not work._

### Using a custom React component

It is similarly simple. Let's have the following simple component:

```jsx
import React, { Component } from 'react';

// Defines a simple button React component
export default class DemoButton extends Component {
    render() {
        return <button 
            className="b-button b-green" 
            onClick={this.props.onClick} 
            style={{ width : '100%' }}
        >{this.props.text}</button>
    }
}
```
The button expects `text` and `onClick` as its properties. In the grid application we have to import `DemoButton` and then we can use this component as follows:

```jsx
import DemoButton from '../components/DemoButton';

/**
 * User clicked the "Edit" button
 */
handleEditClick = record => {
    this.refs.gantt.ganttEngine.editTask(record);
};

render = () => {
    return (
        <BryntumGantt
            // Gantt columns
            columns={[
                {
                    text     : 'Edit<div class="small-text">(React component)</div>',
                    width    : 120,
                    editor   : false,
                    align    : center,
                    // Using custom React component
                    renderer : ({ record }) => record.isLeaf ?
                        <DemoButton 
                            text={'Edit'} 
                            onClick={() => this.handleEditClick(record)
                        }/> 
                        : null
                },
                // ... other columns
            ]}
            // ... other props
        />
    );
}

```
The column `renderer` function above is expected to return JSX, exactly same as in the case of simple inline JSX, but here it returns imported `DemoButton` component. The `renderer` also passes the mandatory props down to the component so that it can render itself in the correct row context.

## Using React as cell editor

It is also possible to use a React component as the cell editor that activates on the cell dbl-click by default. The React component acting as the editor has to implement the following methods:

* setValue
* getValue
* isValid
* focus

These methods are required by `BryntumGantt` React wrapper and an exception is thrown if any of them is missing.

The React component implementing the grid cell editor could look like this:

```jsx
import React, { Component, Fragment } from 'react';

// Defines a simple React cell editor that displays two buttons Yes|No, for editing boolean columns
export default class DemoEditor extends Component {
    state = {
        value : ''
    };

    // Should return the value to be applied when editing finishes
    getValue() {
        return this.state.value;
    }

    // Current cell value + context, set when editing starts. Use it to populate your editor
    setValue(value, cellEditorContext) {
        this.setState({ value });
    }

    // Invalid editors are not allowed to close (unless grid is so configured). 
    // Implement this function to handle validation of your editor
    isValid() {
        // This simple editor is always valid
        return true;
    }

    // Called when editing starts, to set focus at the desired place in your editor
    focus() {
        if (this.state.value) {
            this.noButton.focus();
        }
        else {
            this.yesButton.focus();
        }
    }

    onYesClick() {
        this.setValue(true);
        this.noButton.focus();
    }

    onNoClick() {
        this.setValue(false);
        this.yesButton.focus();
    }

    render() {
        return <Fragment>
            <button 
                className="yes-button" 
                tabIndex={-1} 
                ref={el => this.yesButton = el} 
                style={{ background: this.state.value ? '#D5F5E3' : '#F2F3F4' }} 
                onClick={this.onYesClick.bind(this)}
            >Yes</button>
            <button 
                className="no-button" 
                tabIndex={-1} 
                ref={el => this.noButton = el} 
                style={{ background: this.state.value ? '#F2F3F4' : '#F5B7B1' }} 
                onClick={this.onNoClick.bind(this)}
            >No</button>
        </Fragment>;
    }
}
```

Having the component which implements the editor we can use it in our application as follows:

```jsx
import DemoEditor from '../components/DemoEditor';

render = () => {
    return (
        <BryntumGantt
            columns={[
                {
                    field    : 'draggable',
                    text     : 'Draggable<div class="small-text">(React editor)</div>',
                    align    : 'center',
                    width    : 120,
                    renderer : ({ value }) => value ? 'Yes' : 'No',
                    editor   : ref => <DemoEditor ref={ref}/>
                },
                // ... other columns
            ]}
            // ... other props
        />
    );

```
The `editor` function receives `ref` as the argument and that must be passed down to the React component that implements the cell editor. Although there is no apparent use of this property in the component code itself, it is mandatory because it is used by the `BryntumGantt` wrapper to keep the reference to the React editor component. You can also pass another props if you need but never forget `ref={ref}`.

JSX Cell renderers and editors are implemented as <a href="https://reactjs.org/docs/portals.html" target="_blank">React Portals</a> that allow rendering of React components outside of their parent trees, anywhere in the DOM. We use this feature to render the above DemoButtons in grid cells. The following screenshot shows these buttons in the React Dev Tools. You can click on it so see it in action.

<a href="../examples/react/javascript/basic" target="_blank">
<img src="resources/images/GanttJSX.png" alt="Example of Bryntum Gantt with JSX">
</a>



## Further reading
* For more information on config options, features, events and methods consult please the <a href="#api">API docs</a>
* For more information on React see the <a href="https://reactjs.org" target="_blank">React docs</a>
* For more information on Create React App scripts see <a href="https://facebook.github.io/create-react-app/" target="_blank">the documentation</a>
* If you have any questions related to the integration or Gantt itself you can always ask on <a href="https://www.bryntum.com/forum/">our forum</a>
