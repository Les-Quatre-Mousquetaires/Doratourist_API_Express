'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

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

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

commentSchema.plugin(timestamps);

module.exports = mongoose.model('Comment', commentSchema);