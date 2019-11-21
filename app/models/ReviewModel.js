'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },

    content: {
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

reviewSchema.plugin(timestamps);

module.exports = mongoose.model('Review', reviewSchema);