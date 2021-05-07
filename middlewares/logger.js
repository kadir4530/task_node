const fs = require('fs');
const path = require('path');

const logPath = '../log.txt';

const logTodos = (req, res, next) => {
    const logData = {
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        body: req.body,
        date: new Date()
    }


    fs.appendFile(path.resolve(__dirname, logPath), `${JSON.stringify(logData)}\n`, (error, result) => {
        if (error) {
            console.log(err)
        }
    })
    next();
}

module.exports = { logTodos };