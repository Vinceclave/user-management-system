const nodemailer = require('nodemailer');
const config = require('config.json');

module.exports = sendEmail;

async function sendEmail({ to, subject, html, from = process.env.EMAIL_FROM || config.emailFrom }) {
    const smtpOptions = process.env.SMTP_HOST ? {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    } : config.smtpOptions;

    const transporter = nodemailer.createTransport({
        ...smtpOptions,
        tls: {
            rejectUnauthorized: false // Disable SSL verification for development
        }
    });
    await transporter.sendMail({ from, to, subject, html });
}
