'use strict'

const User = require('../models/UserModel');
const Tour = require('../models/TourModel');

module.exports = {
    index: async (req, res, next) => {
        let tours = await Tour.find();
        if (tours) {
            res.status(200).json(tours);
        } else next();
    },

    new: async (req, res, next) => {
        if (req.user.role == 'guest') return res.status(401).json({ message: 'unauthorazion' })
        let image;
        try {
            image = req.reqFile.filter(file => file.type === 'image')[0].storagedName;
        } catch (e) {
            image = undefined;
        }
        let tourBody = req.body;
        let user = await User.findById(req.user._id);
        let tour = new Tour({
            ...tourBody,
            image,
            creator: user._id
        });
        user.tours.push(tour._id);
        tour.save().then(result => {
            user.save();
            res.status(201).json(result);
        }).catch(err => {
            next(err);
        });

    },

    view: async (req, res, next) => {
        let { resourceId } = res.params;
        let tour = await Tour.findById(resourceId);
        if (tour) {
            res.status(200).json(tour);
        } else next();
    },

    update: async (req, res, next) => {
        let { resourceId } = req.params;
        let image;
        try {
            image = req.reqFile.filter(file => file.type === 'image')[0].storagedName;
        } catch (err) {
            image = undefined;
        }
        let tourContent = {
            ...req.body,
            image: image
        }
        let tour = Tour.findByIdAndUpdate({ _id: resourceId }, { $set: tourContent }, { new: true });
        if (tour) {
            res.status(201).json(tour);
        } else next();
    },

    delete: async (req, res, next) => {
        let { resourceId } = req.params;
        let song = await Tour.findByIdAndDelete(resourceId).catch(err => next());
        if (song) {
            res.status(202).json({ ...song, deleted: true });
        }
    }
}