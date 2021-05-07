const fs = require('fs');
const path = require('path');

const usersPath = '../data/usersData.txt';

const getUsers = (req, res) => {
    fs.readFile(path.resolve(__dirname, usersPath), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            res.status(400).json(err)
        }
        else {
            res.status(200).json(JSON.parse(data));
        }
    })
}

module.exports = {getUsers}