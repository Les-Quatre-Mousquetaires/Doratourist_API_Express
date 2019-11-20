var dotenv = require('dotenv');
dotenv.config();

const database = require('../db/database');

const User = require('../app/models/UserModel');
const Tour = require('../app/models/TourModel');
const Review = require('../app/models/Review');

let resourceName = 'Tour';
let users;

const resources = {
    User: User,
    Tour: Tour,
    Review: Review
}
async function query() {
    users = await resources[resourceName].find();
    console.log(users);
}

query();