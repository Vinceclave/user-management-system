const nodemailer = require('nodemailer');
const functions = require('firebase-functions');
let config;

try {
    // Try to load local config first
    config = require('../config.json');
} catch (e) {
    // Use environment variables or Firebase config if local config is not available
    config = {
        emailFrom: process.env.EMAIL_FROM || functions.config().email.from,
        smtpOptions: {
            host: process.env.SMTP_HOST || functions.config().smtp.host,
            port: parseInt(process.env.SMTP_PORT || functions.config().smtp.port),
            auth: {
                user: process.env.SMTP_USER || functions.config().smtp.user,
                pass: process.env.SMTP_PASS || functions.config().smtp.pass
            }
        }
    };
}

module.exports = sendEmail;

async function sendEmail({ to, subject, html, from = config.emailFrom }) {
    const transporter = nodemailer.createTransport({
        ...config.smtpOptions,
        tls: {
            rejectUnauthorized: false // Disable SSL verification for development
        }
    });
    await transporter.sendMail({ from, to, subject, html });
}
