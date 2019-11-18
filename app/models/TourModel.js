'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var tourSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },

    description: {
        type: String,
        require: true
    },

    image: {
        type: String,
    },

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

tourSchema.plugin(timestamps);

module.exports = mongoose.model('Tour', tourSchema);