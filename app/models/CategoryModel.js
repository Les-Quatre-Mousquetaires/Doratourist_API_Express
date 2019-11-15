'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    image: {
        type: String
    },

    description: {
        type: String
    },

    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

categorySchema.plugin(timestamps);

module.exports = mongoose.model('Category', categorySchema);