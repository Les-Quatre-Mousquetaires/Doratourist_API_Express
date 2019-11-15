'use strict'

const { grantPermission } = require('../commons/grantPermisson');
const { customFilter } = require('../commons/objectEditor');
const Song = require('../models/SongModel');
const User = require('../models/UserModel');

module.exports = {
    index: async (req, res, next) => {
        let { permission } = grantPermission('read:song', req.user, null);
        if (!permission.granted) next();
        else {
            let songs = await Song.find().lean();
            if (songs) {
                let { resData } = customFilter(permission, songs);
                res.status(200).json(resData);
            } else next();
        }
    },
    new: async (req, res, next) => {
        let { permission } = grantPermission('create:song', req.user, null);
        if (!permission.granted) next();
        else {
            let storagedName, image;
            try {
                storagedName = req.reqFile.filter(file => file.type === 'audio')[0].storagedName;
            } catch (e) {
                storagedName = undefined;
            }
            try {
                image = req.reqFile.filter(file => file.type === 'image')[0].storagedName;
            } catch (e) {
                image = undefined;
            }

            let songBody = customFilter(permission, req.body);

            let user = await User.findById(req.user._id);
            let song = new Song({
                ...songBody.resData,
                src: storagedName,
                image: image,
                creator: user._id
            });
            user.songs.push(song._id);

            song.save().then(result => {
                user.save();
                res.status(201).json(result);
            }).catch(err => {
                next(err);
            });
        }

    },
    view: async (req, res, next) => {
        let { resourceId } = req.params;
        let { permission } = grantPermission('read:song', req.user, resourceId);
        if (!permission.granted) next();
        let song = await Song.findById(resourceId);
        if (song) {
            let { resData } = customFilter(permission, song);
            res.status(200).json(resData);
        } else next();
    },
    update: async (req, res, next) => {
        let { resourceId } = req.params;
        let { permission } = grantPermission('update:song', req.user, resourceId);
        if (!permission.granted) next();
        else {
            let image;
            try {
                image = req.reqFile.filter(file => file.type === 'image')[0].storagedName;
            } catch (err) {
                image = undefined;
            }
            let songContent = {
                ...req.body,
                image: image
            };

            let song = await Song.customUpdate(resourceId, songContent);
            if (song) {
                let { resData } = customFilter(permission, song);
                res.status(201).json(resData);
            } else next();
        }
    },
    delete: async (req, res, next) => {
        let { resourceId } = req.params;
        let { permission } = grantPermission('delete:song', req.user, resourceId);
        if (!permission.granted) next();
        else {
            let song = await Song.customDelete(resourceId).catch(err => { next() });
            if (song) {
                res.status(202).json({ message: `Deleted song id: ${song._id}` });
            } else next();
        }
    }
}