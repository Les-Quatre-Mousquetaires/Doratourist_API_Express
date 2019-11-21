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

    { role: 'guest', resource: 'user', action: 'create:any', attributes: '*' },
    { role: 'guest', resource: 'user', action: 'read:any', attributes: '*, !password, !token, !__v' },

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