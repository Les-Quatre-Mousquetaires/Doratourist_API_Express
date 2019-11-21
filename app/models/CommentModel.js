'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
    content: {
        type: String
    },

    cmtOfCmt: [
        {
            content: String,
            creator: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],

    review: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    },

    tour: {
        type: Schema.Types.ObjectId,
        ref: 'Tour',
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

commentSchema.plugin(timestamps);

module.exports = mongoose.model('Comment', commentSchema);