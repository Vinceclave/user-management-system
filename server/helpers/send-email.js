const nodemailer = require('nodemailer');
let config;

try {
    // Try to load local config first
    config = require('../config.json');
} catch (e) {
    // Use environment variables if local config is not available
    config = {
        emailFrom: process.env.EMAIL_FROM || 'mrbeans.dev@gmail.com',
        smtpOptions: {
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || 587),
            auth: {
                user: process.env.SMTP_USER || 'mrbeans.dev@gmail.com',
                pass: process.env.SMTP_PASS || 'gezv stxl piar knuw'
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
