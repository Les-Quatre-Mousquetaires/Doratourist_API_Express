'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var bookSchema = new mongoose.Schema({
    checkinDate: {
        type: String
    },

    tour: {
        type: Schema.Types.ObjectId,
        ref: 'Tour'
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

bookSchema.plugin(timestamps);

module.exports = mongoose.model('Book', bookSchema);