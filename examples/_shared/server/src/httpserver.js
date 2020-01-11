const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const serveStatic = require('serve-static');

module.exports = class HttpServer {

    constructor() {
        this.files = {};
    }

    /**
     * Create the and intialise the webserver
     *
     * @param processFn The function the call with the request
     * @param options The passed options from the command line
     */
    createServer(processFn, options) {

        const me = this;

        app.use(bodyParser.json({ limit : options.maximum || '50mb' }));
        app.use(bodyParser.urlencoded({ extended : false, limit : options.maximum || '50mb' }));

        //Set CORS
        if (options.cors !== 'false') {

            options.cors = options.cors || '*';

            console.log('Access-Control-Allow-Origin: ' + options.cors);

            app.use(function(req, res, next) {
                res.header('Access-Control-Allow-Origin', options.cors);
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                next();
            });
        }

        //Set target to load resources from
        if (options.resources) {
            // app.use('/resources', express.static(options.resources));
            app.use('/resources', serveStatic(options.resources));
        }

        //Get the file, fileKey will be a guid. This serves the pdf
        app.get('/:fileKey/', (req, res) => {
            let file = me.files[req.params.fileKey];

            if (file) {
                res.set('Content-Type', 'application/' + file.fileFormat);

                // Use "inline" to be able to preview PDF file in a browser tab
                // res.set('Content-Disposition', 'inline; filename="' + file.fileName + '"');
                res.set('Content-Disposition', 'form-data; filename="' + file.fileName + '"');

                res.set('Access-Control-Expose-Headers', 'Content-Length');
                res.set('Content-Length', file.buffer.length);
                res.status(200).send(file.buffer);
                delete me.files[req.params.fileKey];
            }
            else {
                res.send('File not found');
            }
        });

        //Catch the posted request.
        if (processFn !== true) {
            app.post('/', (req, res) => {

                const request = req.body;

                //Accepts encoded and parsed html fragments. If still encoded, then parse
                if (typeof request.html === 'string') {
                    request.html = JSON.parse(request.html);
                }

                //Pass the request to the processFn
                processFn(request).then(file => {

                    //On binary the buffer is directly sent to the client, else store file locally in memory for 10 seconds
                    if (request.sendAsBinary) {
                        res.set('Content-Type', 'application/octet-stream');
                        res.status(200).send(file);
                    }
                    else {

                        //Send the url for the cached file, will is cached for 10 seconds
                        res.status(200).jsonp({
                            success : true,
                            url     : me.setFile(req.protocol + '://' + req.get('host') + req.originalUrl, request, file)
                        });
                    }
                }).catch(err => {
                    //Make up min 500 or 200?
                    res.status(request.sendAsBinary ? 500 : 200).jsonp({
                        success : false,
                        msg     : err
                    });
                });

            });
        }

        if (options.http) {
            this.httpPort = options.http;
            this.httpServer = this.createHttpServer();
        }

        if (options.https) {
            this.httpsPort = options.https;
            //Create https server and pass certificate folder
            this.httpsServer = this.createHttpsServer(path.join(process.cwd(), 'cert'));
        }

    }

    /**
     * Stores a file stream temporarily to be fetched on guid
     *
     * @param host This host to fetch from
     * @param request Passed initial request
     * @param file The file buffer pdf/png
     * @returns {*}
     */
    setFile(host, request, file) {

        let me = this;

        let fileKey = uuidv1();
        let url = host + fileKey;
        me.files[fileKey] = {
            date       : new Date(),
            fileFormat : request.fileFormat,
            fileName   : `${request.fileName || `export-${request.range}`}.${request.fileFormat}`,
            buffer     : file
        };

        //You got ten seconds to fetch the file
        setTimeout(() => {
            delete me.files[fileKey];
        }, 10000);

        return url;
    }

    //Create http server instance
    createHttpServer() {
        return http.createServer(app);
    }

    //Start the server, listen on port
    startHttpServer() {
        this.httpServer && this.httpServer.listen(this.httpPort, () => {
            console.log('Http server started on port ' + this.httpPort);
        });
    }

    //Create the https server instance and read the certificates
    createHttpsServer(certPath) {

        let privateKey  = fs.readFileSync(path.join(certPath, 'server.key'), 'utf8');
        let certificate = fs.readFileSync(path.join(certPath, 'server.crt'), 'utf8');

        let credentials = { key : privateKey, cert : certificate };

        return https.createServer(credentials, app);
    }

    //Start the https server and listen on port
    startHttpsServer() {

        this.httpsServer && this.httpsServer.listen(this.httpsPort, () => {
            console.log('Https server started on port ' + this.httpsPort);
        });
    }

    getHttpServer() {
        return this.httpServer;
    }

    getHttpsServer() {
        return this.httpsServer;
    }

    /**
     * Start the service
     */
    start() {
        this.startHttpServer();
        this.startHttpsServer();
    }

};
