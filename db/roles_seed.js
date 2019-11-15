var dotenv = require('dotenv');
dotenv.config();

var database = require('./database');
var Role = require('../app/models/RoleModel');

var chalk = require('chalk');
var logger = console.log;

var grantsList = [
    //  USER Resource
    { role: 'admin', resource: 'user', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'user', action: 'read:any', attributes: '*, !password, !__v' },
    { role: 'admin', resource: 'user', action: 'update:any', attributes: '*' },
    { role: 'admin', resource: 'user', action: 'delete:any', attributes: '*' },

    { role: 'user', resource: 'user', action: 'read:any', attributes: '*, !password, !__v, !token' },
    { role: 'user', resource: 'user', action: 'update:own', attributes: '*, !token' },
    { role: 'user', resource: 'user', action: 'delete:own', attributes: '*' },

    { role: 'guest', resource: 'user', action: 'create:any', attributes: '*, !role' },
    { role: 'guest', resource: 'user', action: 'read:any', attributes: '*, !role, !password, !email, !token, !__v' },

    //  SONG Resource
    { role: 'admin', resource: 'song', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'song', action: 'read:any', attributes: '*, !__v' },
    { role: 'admin', resource: 'song', action: 'update:any', attributes: '*' },
    { role: 'admin', resource: 'song', action: 'delete:any', attributes: '*' },

    { role: 'user', resource: 'song', action: 'create:any', attributes: '*' },
    { role: 'user', resource: 'song', action: 'read:any', attributes: '*, !__v' },
    { role: 'user', resource: 'song', action: 'update:own', attributes: '*' },
    { role: 'user', resource: 'song', action: 'delete:own', attributes: '*' },

    { role: 'guest', resource: 'song', action: 'read:any', attributes: '*, !__v' },

    //  ALBUM Resource
    { role: 'admin', resource: 'album', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'album', action: 'read:any', attributes: '*, !__v' },
    { role: 'admin', resource: 'album', action: 'update:any', attributes: '*, !description, !name' },
    { role: 'admin', resource: 'album', action: 'delete:any', attributes: '*' },

    { role: 'user', resource: 'album', action: 'create:any', attributes: '*' },
    { role: 'user', resource: 'album', action: 'read:any', attributes: '*, !__v' },
    { role: 'user', resource: 'album', action: 'update:own', attributes: '*' },
    { role: 'user', resource: 'album', action: 'delete:own', attributes: '*' },

    { role: 'guest', resource: 'album', action: 'read:any', attributes: '*, !__v' },

    //  CATEGORY Resource
    { role: 'admin', resource: 'category', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'category', action: 'read:any', attributes: '*, !__v' },
    { role: 'admin', resource: 'category', action: 'update:any', attributes: '*' },
    { role: 'admin', resource: 'category', action: 'delete:any', attributes: '*' },

    { role: 'user', resource: 'category', action: 'read:any', attributes: '*, !__v' },

    { role: 'guest', resource: 'category', action: 'read:any', attributes: '*, !__v' },

    //  ARTIST Resource
    { role: 'admin', resource: 'artist', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'artist', action: 'read:any', attributes: '*, !__v' },
    { role: 'admin', resource: 'artist', action: 'update:any', attributes: '*' },
    { role: 'admin', resource: 'artist', action: 'delete:any', attributes: '*' },

    { role: 'user', resource: 'artist', action: 'create:any', attributes: '*' },
    { role: 'user', resource: 'artist', action: 'read:any', attributes: '*, !__v' },
    { role: 'user', resource: 'artist', action: 'update:own', attributes: '*' },
    { role: 'user', resource: 'artist', action: 'delete:own', attributes: '*' },

    { role: 'guest', resource: 'artist', action: 'read:any', attributes: '*, !__v' },

    //  COMMENT Resource
    { role: 'admin', resource: 'comment', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'comment', action: 'read:any', attributes: '*, !__v' },
    { role: 'admin', resource: 'comment', action: 'update:any', attributes: '*, !content' },
    { role: 'admin', resource: 'comment', action: 'delete:any', attributes: '*' },

    { role: 'user', resource: 'comment', action: 'create:any', attributes: '*' },
    { role: 'user', resource: 'comment', action: 'read:any', attributes: '*, !__v' },
    { role: 'user', resource: 'comment', action: 'update:own', attributes: '*' },
    { role: 'user', resource: 'comment', action: 'delete:own', attributes: '*' },

    { role: 'guest', resource: 'comment', action: 'read:any', attributes: '*, !__v' },
];

async function dropAllRoles() {
    await Role.collection.drop();
    logger(chalk.red('deleted all roles in db'));
}

async function addGrantsList() {
    grantsList.forEach(async (grant) => {
        let role = new Role(grant);
        await role.save();
        logger('added role: ' + chalk.green(role));
    });
}

dropAllRoles();
addGrantsList();