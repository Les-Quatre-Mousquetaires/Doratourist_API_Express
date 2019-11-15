'use strict'

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: 'image-album-defaut.jpg'
    },

    description: {
        type: String
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: true
    }]

});

albumSchema.plugin(timestamps);

albumSchema.statics = {
    customUpdate(id, values) {
        return new Promise(async (resolve, reject) => {
            let preAlbum = await this.findById(id).lean();
            if (preAlbum.image) {
                let pathJoin = path.join(global.appRoot, staticPath.images, preAlbum.image);
                fs.exists(pathJoin, (exists) => {
                    if (exists) fs.unlink(pathJoin, (err) => { });
                });
            }
            let album = this.findByIdAndUpdate({ _id: id }, { $set: values }, { new: true });
            if (!album) {
                return reject(new Error('Not found'));
            } else resolve(album);
        });
    },
    customDelete(id) {
        return new Promise(async (resolve, reject) => {
            let preAlbum = await this.findByIdAndUpdate(id).lean();
            if (preAlbum) {
                if (preAlbum.image) {
                    let pathJoin = path.join(global.appRoot, staticPath.images, preAlbum.image);
                    fs.exists(pathJoin, (exists) => {
                        if (exists) fs.unlink(pathJoin, (err) => { });
                    });
                }
                resolve(preAlbum);
            } else {
                reject(new Error('Not found'));
            }
        });
    }
}

module.exports = mongoose.model('Album', albumSchema);