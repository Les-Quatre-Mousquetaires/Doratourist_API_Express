'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    categories: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
    },

    avatarImage: {
        type: String
    },

    coverImage: {
        type: String
    },

    age: {
        type: Number
    },

    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

artistSchema.plugin(timestamps);

module.exports = mongoose.model('Artist', artistSchema);