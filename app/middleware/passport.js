const cryptoRandomString = require('crypto-random-string');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook-token');
const GoogleStrategy = require('passport-google-plus-token');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const mailer = require('../commons/email/index');
const User = require('../models/UserModel');
const config = require('../../config/index');

// Request using JWT
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.key
}, async (payload, done) => {
    // Tìm user trong database
    let user = await User.findById(payload.userId);

    // Nếu user ko tồn tại, handle it
    if (!user) {
        return done(null, false);
    }
    // nếu ko, return user
    done(null, user);
}));

// Login using username && password
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    let user = await User.findOne({ email }).select('-__v');

    if (!user) {
        return done(null, false);
    }

    await user.verifyPassword(password).then(valid => {
        if (!valid) {
            return done(null, false);
        } else {
            done(null, user);
        }
    })

}));

// Login using google auth
passport.use('googleToken', new GoogleStrategy({
    clientID: config.ggAuth.clientID,
    clientSecret: config.ggAuth.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    // console.log('accessToken', accessToken);
    // console.log('refreshToken', refreshToken);
    // console.log('profile', profile);
    let user = await User.findOne({
        email: profile.emails[0].value
    });

    if (!user) {
        let cryptoString = cryptoRandomString({ length: 6, type: 'base64' });
        let newUser = new User({
            email: profile.emails[0].value,
            name: profile.name.familyName + ' ' + profile.name.givenName,
            password: cryptoString
        });
        mailObject = {
            to: newUser.email,
            subject: 'Welcome to DoraSound',
            text: '',
            content: {
                title: 'Welcome to DoraSound',
                body1: 'Xin chào mừng bạn đến với DoraSound',
                body2: 'Đây là mật khẩu đăng nhập DoraSound: <b>' + newUser.password + '</b>',
                body3: 'Chúc bạn nghe nhạc vui vẻ',
                body4: 'Xin cảm ơn - Đội ngũ DoraSound.',
                link: ''
            }
        }
        mailer(mailObject);
        newUser.save();
        return done(null, newUser);
    }
    return done(null, user);
}));


// Login using facebook auth
passport.use('facebookToken', new FacebookStrategy({
    clientID: config.fbAuth.appID,
    clientSecret: config.fbAuth.appSecret
}, async (accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    return done(null, null);
}));