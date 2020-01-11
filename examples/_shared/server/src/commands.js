Getopt = require('node-getopt');

module.exports = class Commands {

    constructor() {
        this.getopt = new Getopt([
            ['h',   'http=PORT'             , 'Start http server on port'],
            ['H',   'https=PORT'            , 'Start https server on port'],
            ['w',   'websocket=PORT'        , 'Start websocket server on port'],
            ['W',   'securewebsocket=PORT'  , 'Start secure websocket server on port'],
            ['c',   'cors=HOST'             , 'CORS origin, default value "*". Set to "false" to disable CORS'],
            ['m',   'maximum=SIZE'          , 'Maximum upload size (default 50mb)'],
            ['r',   'resources=PATH'        , 'The absolute path to the resource directory. This path will be accessible via the webserver'],
            ['f',   'config-file=PATH'      , 'The absolute path to the configuration JSON file.'],
            ['',    'no-sandbox'            , 'Chromium no-sandbox argument']
        ]);

        this.getopt.setHelp(
            'Usage: ./server [OPTION]\n' +
            '\n' +
            '[[OPTIONS]]\n'
        );

        //this.getopt.on('?', this.showHelp.bind(this));
    }

    showHelp() {
        this.getopt.showHelp();
    }

    getOptions() {
        return this.getopt.parse(process.argv.slice(2));
    }
};
