const WS = require('ws');

module.exports = class WebSocket {

    constructor(server) {
        this.server = server;
    }

    /**
     * Create the websocket server
     * @param processFn The function that creates the filestream based on passed request
     * @param options The command line options
     */
    createServer(processFn, options) {

        if (options.websocket) {
            this.addListeners(new WS.Server({ server : this.server.getHttpServer() }), processFn);
            console.log('Websocket enabled on port ' + this.server.httpPort);
        }

        if (options.securewebsocket) {
            this.addListeners(new WS.Server({ server : this.server.getHttpsServer() }), processFn);
            console.log('Secure websocket enabled on port ' + this.server.httpsPort);
        }
    }

    //Convience function to create a websocket
    addListeners(wss, processFn) {

        let me = this;

        //Listen on connection
        wss.on('connection', function connection(ws) {

            console.log('ws connection');

            //Message coming in.
            ws.on('message', function incoming(data) {

                //parse the request
                let request = JSON.parse(data);

                processFn(request).then(file => {

                    //Send the url with guid to fetch the file
                    ws.send(JSON.stringify({
                        success : true,
                        file    : me.server.setFile('', request, file)
                    }));

                }).catch(err => {
                    //Something went wrong, pass the message to the client
                    ws.send(JSON.stringify({
                        success : false,
                        msg     : err
                    }));
                });
            });

            //Bye bye
            ws.on('close', function close() {
                console.log('ws disconnected');
            });

        });
    }
};
