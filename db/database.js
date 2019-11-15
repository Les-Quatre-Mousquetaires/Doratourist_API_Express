'use strict';

var mongoose = require('mongoose');
var config = require('../config/index');

const mongodb_hostname = config.mongoDb.hostname;
const mongodb_databaseName = config.mongoDb.databaseName;
const username = config.mongoDb.username;
const password = config.mongoDb.password;

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        let uri = `mongodb+srv://${username}:${password}@${mongodb_hostname}/${mongodb_databaseName}`;
        console.log(uri);
        mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }).then(() => {
            console.log('Database connection successful');
        }).catch(err => {
            console.error('Database connection error');
        });
        mongoose.Promise = global.Promise;
    }
}

module.exports = new Database();