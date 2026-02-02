// ./modules/utils.js

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
}

module.exports = { DateUtils, FileUtils };