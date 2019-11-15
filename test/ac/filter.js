var AccessControl = require('accesscontrol');
var assets = {
    role: 'admin',
    _id: '5d7dc5fa6b2eca0e898f81e5',
    name: 'tran qweqweqwephu quy',
    email: 'admin@gmail.com',
    password: '$2a$10$cfi9hHDU6T.pe35ut.aZzewVGRPHxCuMeHbcN.sXpEqTimxCVozkG',
    updatedAt: '2019 - 09 - 15T05: 02: 51.002Z',
    createdAt: '2019 - 09 - 15T05: 02: 51.002Z',
    __v: 0
};

var filtered = AccessControl.filter(assets, [ '*', '!password', '!__v', '!token' ]);
console.log(filtered); // { notebook: "Mac", car: { model: "Mustang" } }

// filtered = AccessControl.filter(assets, "*"); // or AccessControl.filter(assets, ["*"]);
// console.log(assets); // { notebook: "Mac", car: { model: "Mustang" } }

// filtered = AccessControl.filter(assets); // or AccessControl.filter(assets, "");
// console.log(assets); // {}