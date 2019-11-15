'use strict'

var mongoose = require('mongoose');
var bcrypt = require('mongoose-bcrypt');
var timestamps = require('mongoose-timestamp');
var validator = require('validator');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },

    avatar: {
        type: String
    },

    cover: {
        type: String
    },

    password: {
        type: String,
        bcrypt: true,
        required: true
    },

    age: {
        type: Number
    },

    token: {
        type: String
    },

    role: {
        type: String,
        default: 'user'
    },

    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }]
    ,

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

userSchema.plugin(bcrypt);
userSchema.plugin(timestamps);

module.exports = mongoose.model('User', userSchema);