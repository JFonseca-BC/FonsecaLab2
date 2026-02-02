// ./server.js

const https = require('https');
const url = require('url');
const Math = require('./modules/math');
const Utils = require('./modules/utils');
const UserMessages = require('./lang/messages/en/user');

class Server {
    constructor(port) {
        this.port = port;
        this.math = new Math();
        this.dateUtils = new Utils.DateUtils();
        this.fileUtils = new Utils.FileUtils();
        this.userMessages = new UserMessages();
    }

    start() {
        console.log(`Hello, Jacob. The sum of 5 and 3 is: ${this.math.add(5, 3)}`);

        const server = https.createServer((req, res) => {
            const parsedUrl = url.parse(req.url, true);
            const currentTime = this.dateUtils.getDate();
            const query = parsedUrl.query;

            if (path === '/getDate') {
                const name = query.name || 'Guest';
                const currentTime = this.dateUtils.getDate();
                const message = this.userMessages.getMessage(name, currentTime);
            }
        })
    }
}