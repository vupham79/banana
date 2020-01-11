const puppeteer = require('puppeteer');
const path = require('path');
const hummus = require('hummus');
const memoryStreams = require('memory-streams');
const mergeImg = require('merge-img');
const Commands = require('./commands.js');
const HttpServer = require('./httpserver.js');
const WebSocket = require('./websocket.js');

//Do a check if this is a Pkg executable or is executed from nodejs commandline
const isPkg = typeof process.pkg !== 'undefined';

//Local copies of chromium is delivered next to the executable, we need to correct path to the local copy instead of reference to node_modules

const chromiumExecutablePath = (isPkg
    ? puppeteer.executablePath().replace(
        /^.*?[/\\]node_modules[/\\]puppeteer[/\\]\.local-chromium/,
        path.join(path.dirname(process.execPath), 'chromium')
    )
    : puppeteer.executablePath()
);

// https://pptr.dev/#?product=Puppeteer&version=v2.0.0&show=api-pagepdfoptions
const paperFormat = {
    letter  : { width : 8.5, height : 11 },
    legal   : { width : 8.5, height : 14 },
    tabloid : { width : 11, height : 17 },
    ledger  : { width : 17, height : 11 },
    a0      : { width : 33.1, height : 46.8 },
    a1      : { width : 23.4, height : 33.1 },
    a2      : { width : 16.54, height : 23.4 },
    a3      : { width : 11.7, height : 16.54 },
    a4      : { width : 8.27, height : 11.7 },
    a5      : { width : 5.83, height : 8.27 },
    a6      : { width : 4.13, height : 5.83 }
};

const inchToPx = function(value, round = true) {
    // 1in = 96px for screens
    // https://developer.mozilla.org/en-US/docs/Web/CSS/length#Absolute_length_units
    let result = value * 96;
    
    if (round) {
        result = Math.round(result);
    }
    
    return result;
};

/**
 * Creates a single PDF buffer for a passed html fragment
 * @param browser
 * @param html
 * @param config
 * @returns {Promise<any>}
 */
async function processPageIntoPdfBuffer(browser, html, config)  {

    config.printBackground = true;
    config.margin = {
        top    : 0,
        bottom : 0,
        left   : 1,
        right  : 1
    };

    return new Promise(async(resolve, reject) => {

        try {
            const page = await browser.newPage();
            
            // NOTE: NOT SUPPORTED IN WSL
            if (config.clientURL) {
                // Navigate page to get rid of possible CORS
                try {
                    await page.goto(config.clientURL, { waitUntil : 'load', referer : 'bryntum_pdf_export_server' });
                }
                catch (e) {
                    reject(`Unable to open client url ${config.clientURL}.\nError: ${e.message}`);
                }
            }
            
            await page.setContent(html, { waitUntil : 'networkidle0' });
            await page.emulateMedia('print');
            const buffer = await page.pdf(config);
            await page.close();
            resolve(buffer);
        }
        catch (ex) {
            reject(ex.message);
        }
    });
}

/**
 * Creates a single PNG buffer for a passed html fragment
 * @param browser
 * @param html
 * @param config
 * @returns {Promise<any>}
 */
async function processPageIntoPngBuffer(browser, html, config)  {

    return new Promise(async(resolve, reject) => {

        try {
            const viewportConfig = Object.assign({
                fullPage          : true,
                // https://github.com/puppeteer/puppeteer/issues/1329
                deviceScaleFactor : 4
            }, config);
    
            const page = await browser.newPage();
    
            // NOTE: NOT SUPPORTED IN WSL
            if (config.clientURL) {
                // Navigate page to get rid of possible CORS
                try {
                    await page.goto(config.clientURL, { waitUntil : 'load', referer : 'bryntum_pdf_export_server' });
                }
                catch (e) {
                    // try to continue export
                    console.log(`Unable to open client url ${config.clientURL}.\nError: ${e.message}`);
                }
            }
            
            await page.setContent(html, { waitUntil : 'networkidle0' });
            
            const contentElement = await page.$('.b-export-content');
            
            let contentBox;
            
            if (contentElement) {
                // Content element has style `height: 100%;` and `transform: scale(...)`, which makes bounding box to be
                // scaled too thus incorrect. Since it is the only wrapper element, we change style to auto, which allows
                // to get correct height/width of the rect.
                // Alternative would be to get 3 elements: height, body and footer, measure height/width and combine
                // TODO: check if we can avoid modifying styles
                await contentElement.evaluate(node => node.style.height = 'auto');
                contentBox = await contentElement.boundingBox();
            }
            
            // If viewport size is set directly - use it
            if (viewportConfig.width) {
                if (/in/.test(viewportConfig.width)) {
                    viewportConfig.width = inchToPx(parseFloat(viewportConfig.width));
                    viewportConfig.height = inchToPx(parseFloat(viewportConfig.width));
                }
            }
            // if content box starts at 0,0 then we can adjust content size perfectly
            else if (contentBox && contentBox.x === 0 && contentBox.y === 0) {
                viewportConfig.width = Math.round(contentBox.width);
                viewportConfig.height = Math.round(contentBox.height);
            }
            else {
                const
                    format = paperFormat[viewportConfig.format.toLowerCase()],
                    width  = viewportConfig.orientation === 'portrait' ? format.width : format.height,
                    height = viewportConfig.orientation === 'portrait' ? format.height : format.width;
                
                viewportConfig.width = inchToPx(width);
                viewportConfig.height = inchToPx(height);
            }
    
            await page.setViewport(viewportConfig);
            await page.emulateMedia('print');
            const buffer = await page.screenshot(config);
            await page.close();
            resolve(buffer);

        }
        catch (ex) {
            reject(ex.message);
        }
    });
}

/**
 * Concatenate an array of pdf buffer and return a combined buffer
 *
 * @param pdfs
 * @returns {Promise<any>}
 */
function combinePdfBuffers(pdfs) {

    let outStream = new memoryStreams.WritableStream();

    return new Promise((resolve, reject) => {
        try {

            if (pdfs.length === 1) {
                resolve(pdfs[0]);
            }

            let first = pdfs.shift();
            let firstPage = new hummus.PDFRStreamForBuffer(first);
            let pdfWriter = hummus.createWriterToModify(firstPage, new hummus.PDFStreamForResponse(outStream));

            let next = pdfs.shift();

            while (next) {
                let nextPage = new hummus.PDFRStreamForBuffer(next);
                pdfWriter.appendPDFPagesFromPDF(nextPage);
                next = pdfs.shift();
            }

            pdfWriter.end();
            let mergedBuffer = outStream.toBuffer();
            outStream.end();

            resolve(mergedBuffer);
        }
        catch (err) {
            outStream.end();
            reject(err.message);
        }
    });
}

/**
 * Concatenate an array of Png buffers and return the combined result. This function uses the hummus package, a copy the hummus binary is delivered next to the executable.
 *
 * @param pngs
 * @returns {Promise<any>}
 */
function combinePngBuffers(pngs) {
    return new Promise((resolve, reject) => {
        mergeImg(pngs, { direction : true }).then(img => {
            img.getBuffer('image/png', (s, buf) => {
                resolve(buf);
            });

        }).catch(err => reject(err && err.message));
    });
}

/**
 * Main entry to process an export request. The format of the request object should be:
 *
 * request
 *  - format: like A4
 *  - fileFormat: pdf | png
 *  - html: an array of html fragments (Strings).
 *      - html (this contains the fragment)
 *      - column
 *      - row
 *      - rowsHeight
 *      - number
 *  - range: like 'complete'
 *  - orientation : landscape | portrait
 *
 * @param request
 * @returns {Promise<any>}
 */
function processRequest(request) {

    return new Promise(async(resolve, reject) => {
        let html = request.html;
        let landscape = request.orientation === 'landscape';
        let format = request.format;
        let fileFormat = request.fileFormat;
        let clientURL = request.clientURL;
        let files = [];

        if (!html) {
            reject('No html fragments found');
        }
        else {

            //Create a new browser instance, --no-sandbox is actually only needed to bypass windows security
            const browser = await puppeteer.launch({ executablePath : chromiumExecutablePath, args : chromiumArgs });

            let config = {
                clientURL
            };

            let dimension = format.split('*');
            //format can be send in format 12in*14in. This has precedence over A4, Letter etcetera
            if (dimension.length === 2) {
                config.width = dimension[0];
                config.height = dimension[1];
                config.pageRanges = '1-1';
            }
            else {
                config.format = format;
                config.landscape = landscape;
            }

            //For each html fragment, do
            for (let i = 0; i < html.length; i++) {

                let file = null;

                switch (fileFormat) {
                    case 'pdf' :
                        //Use puppeteer to create pdf buffer
                        file = await processPageIntoPdfBuffer(browser, html[i].html, config).catch(async(err) => {
                            await browser.close();
                            reject(err);
                        });
                        break;

                    case 'png' :
                        //Use puppeteer to create screenshots
                        file = await processPageIntoPngBuffer(browser, html[i].html, config).catch(async(err) => {
                            await browser.close();
                            reject(err);
                        });
                        break;
                }

                //Processed delete from memory
                delete html[i].html;
                files.push(file);
            }

            await browser.close();

            //All buffers are stored in the files object, we need to concatenate them
            if (files.length) {

                switch (fileFormat) {
                    case 'pdf':
                        resolve(await combinePdfBuffers(files).catch(err => reject(err)));
                        break;
                    case 'png':
                        resolve(await combinePngBuffers(files).catch(err => {
                            reject(err);
                        }));
                        break;
                }

            }
            else {
                reject('Something went wrong: no files');
            }
        }
    });
}

//Read commandline options
const commands = new Commands();
const options = commands.getOptions().options;

if (options['config-file']) {
    try {
        let config = require(path.resolve(options['config-file']));
        Object.assign(options, config);
    }
    catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
            console.log('File not found: ' + options['config-file']);
        }
        else {
            throw e;
        }
    }
}

let webServer = null;
let start = false;

let chromiumArgs = [];

if (options['no-sandbox']) {
    chromiumArgs.push('--no-sandbox');
}

if (options['disable-web-security']) {
    chromiumArgs.push('--disable-web-security');
}

//Create webserver, store it in webServer var to re-use
if (options.http || options.https) {
    start = true;
    webServer = new HttpServer();
    webServer.createServer(processRequest, options);
}

//Websocket requested
if (options.websocket || options.securewebsocket) {

    start = true;

    let serverConfig = null;
    let webSocketServer = null;

    if (options.websocket) {
        if (options.websocket === options.http) {
            //Take current http server
            webSocketServer = new WebSocket(webServer);
            //Pass the processFn for the request
            webSocketServer.createServer(processRequest, options);
        }
        else {
            //Create new webserver configuration
            serverConfig = { http : options.websocket, resources : options.resources };
        }
    }

    if (options.securewebsocket) {
        if (options.securewebsocket === options.https) {
            //Take current webserver. Pass processFn for the request
            !webSocketServer && new WebSocket(webServer).createServer(processRequest, options);
        }
        else {
            //Create new webserver config or create new one
            serverConfig = serverConfig || { resources : options.resources };
            serverConfig.https = options.securewebsocket;
        }
    }

    //When we created a new config then create a new dedicated webserver for websockets.
    if (serverConfig) {
        let dedicatedServer = new HttpServer();
        //true as first argument disables post option / only socket connection allowed
        dedicatedServer.createServer(true, serverConfig);
        webSocketServer = new WebSocket(dedicatedServer);
        webSocketServer.createServer(processRequest, options);
        dedicatedServer.start();
    }
}

//Start the webserver
if (start) {
    webServer && webServer.start();
}
else {
    commands.showHelp();
    process.exit();
}
