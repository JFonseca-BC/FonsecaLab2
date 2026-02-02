// ./server.js

const http = require('http');
const fs = require('fs')
const url = require('url');
const Math = require('./modules/math');
const UserMessages = require('./lang/messages/en/user');
const HTMLText = require('./lang/messages/en/html');
const Utils = require('./modules/utils');

class FileHandler {
    constructor(fileUtils) {
        this.fileUtils = fileUtils;
    }

    append(fileName, text) {
        return this.fileUtils.appendToFile(fileName, text);
    }

    read(fileName) {
        return this.fileUtils.readFromFile(fileName);
    }
}

class Server {
    constructor(port) {
        this.port = port;
        this.math = new Math();
        this.dateUtils = new Utils.DateUtils();
        this.fileUtils = new Utils.FileUtils();
        this.userMessages = new UserMessages();
        this.htmlText = new HTMLText();

        this.fileHandler = new FileHandler(this.fileUtils);
    }

    start() {
        console.log(`Hello, Jacob. The sum of 5 and 3 is: ${this.math.add(5, 3)}`);

        const server = http.createServer(function(req, res) {
            const parsedUrl = url.parse(req.url, true);
            const path = parsedUrl.pathname.replace(/\/+$/,'');
            const query = parsedUrl.query;

            if (path === '') {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(
                    this.htmlText.header +
                    this.htmlText.usage
                );
                res.end();

            } else if (path === '/getDate') {
                const name = query.name || 'Guest';
                const currentTime = this.dateUtils.getDate();
                const message = this.userMessages.getMessage(name, currentTime);

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(
                    this.htmlText.header +
                    this.htmlText.getDateMessage.replace("%1", message)
                );
                res.end();

            } else if (path === '/readFile') {
                // idk if this is allowed, but I made the file name a query
                // instead of hardcoding it in the path
                const fileName = query.file || 'file.txt';
                try {
                    const content = this.fileHandler.read(fileName);
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(
                        this.htmlText.header +
                        this.htmlText.successRead.replace("%1", content)
                    );
                    res.end();
                } catch (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write(
                        this.htmlText.header +
                        this.htmlText.failRead.replace("%1", 'fileName')
                    );
                    res.end();
                }

            } else if (path === '/writeFile') {
                const fileName = query.file || 'file.txt';
                if (query.text) {
                    const text = query.text;
                    this.fileHandler.append(fileName, text);

                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(
                        this.htmlText.header +
                        this.htmlText.successWrite
                    );
                    res.end();
                } else {
                    res.writeHead(400, { 'Content-Type': 'text/html' });
                    res.write(
                        this.htmlText.header +
                        this.htmlText.failWrite
                    );
                    res.end();
                }

            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            }
        }.bind(this));

        server.listen(this.port, function() {
            console.log(`Server is listening on port ${this.port}`);
        }.bind(this));
    }
}

const port = process.env.PORT || 8000;
const app = new Server(port);
app.start();

/*

AI Discolsure: While all code was human written and edited, AI was used to assist in the development process.

Assistance from Google Gemini 3 PRO includes:
- Getting help with module exports and imports.
- Getting help with parsing urls for name
- Helping to understand http and res methods, i.e. res.writeHead and res.end
- Troubleshooting http and fs issues, including reading SSL certificates.

*/