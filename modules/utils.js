// ./modules/utils.js
const fs = require('fs');

class DateUtils {
    constructor() {}

    getDate() {
        let date = new Date();
        date = date.toString();
        
        return date;
    }
}

class FileUtils {
    constructor() {}

    appendToFile(filePath, text) {
        try {
            fs.appendFileSync(filePath, text + '\n');
            return true;
        } catch (err) {
            console.error("Error writing to file:", err);
            return false;
        }
    }

    readFromFile(filePath) {
        return fs.readFileSync(filePath, 'utf8');
    }
}

module.exports = { DateUtils, FileUtils };