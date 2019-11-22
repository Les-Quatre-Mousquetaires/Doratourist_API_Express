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
    _id: '',
    createdAt: '',
    creator: {
        _id: '',
        name: ''
    },
    content: ''
};

module.exports = {
    index: (req, res, next) => {
        let comments = [];
        for (let i = 0; i < 4; i++) {
            comment.createdAt = new Date().toISOString().slice(0, 10).replace(/-/g, "");
            comment.creator.name = faker.name.findName();
            comment.creator._id = faker.helpers.replaceSymbolWithNumber("################");
            comment._id = faker.helpers.replaceSymbolWithNumber("################");
            comment.content = faker.lorem.sentences(2,2);
            comments.push(comment);
        }
        if (comments) {
            res.status(200).json(comments);
        }
    },

    new: async (req, res, next) => {
        next();

    },

    view: async (req, res, next) => {
        next();

    },

    update: async (req, res, next) => {
        next();

    },

    delete: async (req, res, next) => {
        next();
    }
}