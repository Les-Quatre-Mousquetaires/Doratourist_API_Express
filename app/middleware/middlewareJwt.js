const passport = require('passport');
var User = require('../models/UserModel');

module.exports = {
    middlewareJWT: (req, res, next) => {
        passport.authenticate('jwt', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                let guestUser = new User({ role: 'guest' });
                req.user = guestUser;
                next();
            }
            if (user) {
                req.user = user;
                next();
            }
        })(req, res, next);
    }
}