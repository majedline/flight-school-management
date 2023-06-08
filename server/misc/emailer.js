const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.process.env.emailHost,
    port: 465,
    secure: true,
    auth: {
        user: process.env.email ,
        pass: process.env.emailPassword,
    },
});

const sendEmail = (to, subject, body, toke = null) => {
    console.log("sending to to", to);
    const mailOptions = {
        from: process.env.email,
        to: to,
        subject: subject,
        html: body
    };
    console.log("details", mailOptions);

    transporter.sendMail(mailOptions, function (error, info) {
        console.log("sending....");
        if (error) {
            console.log('Error in sending email  ' + error);
            return true;
        } else {
            console.log('Email sent: ' + info.response);
            return false;
        }
    });
};

module.exports = sendEmail; 