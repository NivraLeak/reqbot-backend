const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'warnecklek@gmail.com', // ethereal user
        pass: 'hoxlvrggqschtdpt', // ethereal password
    },
});

module.exports = transporter
