var nodemailer = require('nodemailer');
var config = require('../../../config/index');
var template = require('./templates/index');

function sendMail(mailObject) {
    var { to, subject, text, content } = mailObject;
    const configMail = {
        service: 'gmail',
        auth: {
            user: config.email.gmailUsername,
            pass: config.email.gmailPassword,
        }
    };
    var transporter = nodemailer.createTransport(configMail);

    var mail = {
        from: config.email.gmailUsername,
        to: to,
        subject: subject,
        text: text,
        html: template(content)
    };

    transporter.sendMail(mail, (err, info) => {
        if (err) {
            return console.log(err);
        } else {
            // return console.log(info.response);
            return true;
        }
    });
}

module.exports = sendMail;