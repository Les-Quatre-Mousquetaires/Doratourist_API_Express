'use strict'

var mongoose = require('mongoose');

var roleSchema = new mongoose.Schema({
    role: String,

    resource: String,

    action: String,
    
    attributes: {
        type: String,
        default: '*'
    }
});

module.exports = mongoose.model('Role', roleSchema);