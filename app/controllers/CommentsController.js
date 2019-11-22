'use strict'

const Comment = require('../models/CommentModel');
const User = require('../models/UserModel');
const Tour = require('../models/TourModel');
const Review = require('../models/ReviewModel');
const faker = require('faker');

let resources = {
    'Tour': Tour,
    'Review': Review
}

let comment = {
    createdAt: '',
    creator: {
        _id: '',
        name: ''
    },
    content: ''
};

module.exports = {
    index: async (req, res, next) => {
        let comments = [];
        for (let i = 0; i < 4; i++) {
            comment.createdAt = new Date().format('m-d-Y h:i:s');
            comment.creator.name = faker.name.findName();
            comment.creator._id = faker.helpers.replaceSymbolWithNumber("################");
            comment.content = faker.hacker.phrase();
            comments.push(comments);
        }
        res.status(200).json(comments);
    },

    new: async (req, res, next) => {
        let { resourceName } = req.resourceName;

        if (req.user.role == 'guest') return res.status(401).json({ message: 'Un-Authorization' });

        let { resourceId } = req.params;

        let commentBody = req.body;

        let user = await User.findById(req.user._id);
        let resourceObject = await resources[resourceName].findById(resourceId);

        let comment = new Comment({
            ...commentBody,
            [resourceName]: resourceObject._id,
            creator: user._id
        });
        user.comments.push(comment._id);
        resourceObject.comments.push(comment._id);
        comment.save().then(result => {
            user.save(); resourceObject.save();
            res.status(201).json(result);
        }).catch(err => next(err));
    },

    view: async (req, res, next) => {
        let { resourceId } = req.params;
        let tour = Comment.findById(resourceId);
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