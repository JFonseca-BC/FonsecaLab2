// ./server.js

const http = require('http');
const fs = require('fs')
const url = require('url');
const Math = require('./modules/math');
const UserMessages = require('./lang/messages/en/user');
const Utils = require('./modules/utils');

class FileHandler {
    constructor(fileUtils) {
        this.fileUtils = fileUtils;
    }
}

class Server {
    constructor(port) {
        this.port = port;
        this.math = new Math();
        this.dateUtils = new Utils.DateUtils();
        this.fileUtils = new Utils.FileUtils();
        this.userMessages = new UserMessages();

        this.fileHandler = new FileHandler(this.fileUtils);
    }

    start() {
        console.log(`Hello, Jacob. The sum of 5 and 3 is: ${this.math.add(5, 3)}`);

        const server = http.createServer(function(req, res) {
            const parsedUrl = url.parse(req.url, true);
            const path = parsedUrl.pathname;
            const query = parsedUrl.query;

            if (path === '/') {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(`
                    
                    <head>
                        <title>Lab 2</title>
                    </head>
                    <body>
                        <h1 style="padding: 15px;">Usage:</h1>
                        <ul>
                            <li>/getDate?name=[your_name] - Get current date and time with a personalized message.</li>
                            <li>/readFile - Read content from a file.</li>
                            <li>/writeFile/file.txt - Write content to a file.</li>
                        </ul>
                    </body>

                    `);
                

            } else if (path === '/getDate') {
                const name = query.name || 'Guest';
                const currentTime = this.dateUtils.getDate();
                const message = this.userMessages.getMessage(name, currentTime);

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(`
                    
                    <head>
                        <title>Lab 2</title>
                    </head>
                    <body>
                        <h1 style="padding: 15px; color: blue;">${message}</h1>
                    </body>

                    `);
                res.end();

            } else if (path === '/readFile') {
                // Read logic

            } else if (path === '/writeFile/file.txt') {
                // Write logic

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