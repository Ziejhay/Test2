const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { password } = req.body;
    // We pull the password from the hidden environment variable
    const CORRECT_PASSWORD = process.env.MASTER_PASSWORD;

    if (password === CORRECT_PASSWORD) {
        return res.status(200).json({ success: true });
    } else {
        // Only send the email if the password is wrong
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com', // Your email
                pass: process.env.EMAIL_PASS // The 16-char App Password
            }
        });

        await transporter.sendMail({
            from: 'your-email@gmail.com',
            to: 'your-email@gmail.com',
            subject: '⚠️ Security Alert',
            text: 'Someone tried to log in with a wrong password.'
        });

        return res.status(401).json({ success: false });
    }
}
