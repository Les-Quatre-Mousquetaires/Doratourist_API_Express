'use strict'

var fs = require('fs');
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var path = require('path');
var User = require('./UserModel');
var { staticPath } = require('../../config/index');
var Schema = mongoose.Schema;

var songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    src: {
        type: String,
        required: true
    },

    image: {
        type: String
    },

    artist: [{
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    }],

    lyric: {
        type: String
    },

    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    },

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

songSchema.plugin(timestamps);

songSchema.statics = {
    customUpdate(id, values) {
        return new Promise(async (resolve, reject) => {
            let preSong = await this.findById(id).lean();
            if (values.image) {
                let pathJoin = path.join(global.appRoot, staticPath.images, preSong.image);
                fs.exists(pathJoin, (exists) => {
                    if (exists) fs.unlink(pathJoin, (err) => { });
                });
            }
            let song = this.findByIdAndUpdate({ _id: id }, { $set: values }, { new: true });
            if (!song) {
                return reject(new Error('Not found'));
            } else resolve(song);
        });
    },
    customDelete(id) {
        return new Promise(async (resolve, reject) => {
            let preSong = await this.findByIdAndDelete(id).lean();
            if (preSong) {
                let user = await User.findById(preSong.creator);
                user.songs = user.songs.filter(ids => ids != id);
                user.save();
                if (preSong.src) {
                    let pathJoin = path.join(global.appRoot, staticPath.audios, preSong.src)
                    fs.exists(pathJoin, (exists) => {
                        if (exists) {
                            fs.unlink(pathJoin, (err) => { });
                        }
                    });
                }
                if (preSong.image) {
                    let pathJoin = path.join(global.appRoot, staticPath.images, preSong.image);
                    fs.exists(pathJoin, (exist) => {
                        if (exist) {
                            fs.unlink(pathJoin, (err) => { });
                        }
                    });
                }
                resolve(preSong);
            } else {
                reject(new Error('Not found'));
            }

        });
    }
}

module.exports = mongoose.model('Song', songSchema);