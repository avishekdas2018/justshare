const nodemailer = require('nodemailer');

async function sendMail ({from, to, subject, text, html}) {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    let info = await transporter.sendMail({
        from: `jUSTshare <${from}>`,
        to,
        subject,
        text,
        html 
    });

    console.log(info);
}

module.exports = sendMail;