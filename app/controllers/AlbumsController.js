const Album = require('../models/AlbumModel')
const { grantPermission } = require('../commons/grantPermisson')
const { customFilter } = require('../commons/objectEditor');
const User = require('../models/UserModel');

module.exports = {
    index: async (req, res, next) => {
        let { permission } = grantPermission('read:album', req.user, null);
        if (!permission.granted) next();
        else {
            let albums = await Album.find().lean();
            if (albums) {
                let { resData } = customFilter(permission, albums);
                res.status(200).json(resData);
            } else next();
        }
    },
    new: async (req, res, next) => {
        let { permission } = grantPermission('create:album', req.user, null);
        if (!permission.granted) next();
        else {
            let image;
            try {
                image = req.reqFile.filter(files => files.type === 'image')[0].storagedName;
            } catch (e) {
                image = undefined;
            }

            let albumBody = customFilter(permission, req.body);

            let album = new Album({
                ...albumBody.resData,
                creator: req.user._id,
                image: image
            });

            album.save().then(result => {
                res.status(201).json(result);
            }).catch(err => {
                next();
            });
        }
    },
    view: async (req, res, next) => {
        let { resourceId } = req.params;
        let { permission } = grantPermission('read:album', req.user, resourceId);
        if (!permission.granted) next();
        else {
            let albums = Album.find().lean();
            if (albums) {
                let { resData } = customFilter(permission, albums);
                res.status(200).json(resData);
            } else next();
        }
    },
    update: async (req, res, next) => {
        let { resourceId } = req.params;
        let { permission } = grantPermission('update:album', req.user, resourceId);

        if (!permission.granted) next();
        else {
            let albumBody = customFilter(permission, req.body);
            let image;
            try {
                image = req.reqFile.filter(files => files.type === 'image')[0].storagedName;
            } catch (err) {
                image = undefined;
            }
            let albumContent = {
                ...albumBody.resData,
                image: image
            }
        }
    },
    delete: async (req, res, next) => {
        let { resourceId } = req.params;
        let { permission } = grantPermission('delete:album', req.user, resourceId);
        if (!permission.granted) next();
        else {
            let album = await Album.customDelete(resourceId);
            if (album) {
                res.status(202).json({ message: `Deleted album id: ${album._id}` });
            } else next();
        }
    }
}