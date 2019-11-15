var AccessControl = require('accesscontrol');
var Role = require('../models/RoleModel');

async function accessControl() {
    const grantList = await Role.find({});
    const filteredObj = grantList.map(e => ({
        role: e.role,
        resource: e.resource,
        action: e.action,
        attributes: e.attributes
    }));
    const ac = new AccessControl();
    ac.setGrants(filteredObj);
    global.ac = ac;
    return ac;
}

module.exports = accessControl;