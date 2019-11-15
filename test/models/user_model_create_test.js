// gọi database trước khi test với models
let database = require('../../db/database');
let UserModel = require('../../models/UserModel');

let user = new UserModel({
    name: 'Trần Phú Quy',
    username: 'tranphuquy19',
    email: 'tranphuquy19@gmail.com',
    password: 'root@123',
    admin: true
});
user.save().then(mess => {
    console.log(mess);
}).catch(err => {
    console.log(err);
});

// MONGODB_HOSTNAME=cluster0-zyqpm.gcp.mongodb.net MONGODB_DATABASENAME=music-tv-api MONGODB_USERNAME=tranphuquy19 MONGODB_PASSWORD=root@123 node user_model_create_test.js