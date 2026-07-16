const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    // Ensure we are grabbing 'password' to match your updated script.js
    const { password, targetUrl } = req.body;
    const CORRECT_PASSWORD = process.env.MASTER_PASSWORD;

    if (password === CORRECT_PASSWORD) {
        // Success: Send back the redirect URL
        return res.status(200).json({ success: true, redirect: targetUrl });
    } else {
        // Failure: Trigger the email alert
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com', // Replace with your actual email
                pass: process.env.EMAIL_PASS 
            }
        });

        await transporter.sendMail({
            from: 'ziejhaycantalejo0909@gmail.com',
            to: 'ziejhaycantalejo0909@gmail.com',
            subject: '⚠️ Security Alert: Failed Login Attempt',
            text: 'Someone tried to access your dashboard with an incorrect password.'
        });

        return res.status(401).json({ success: false });
    }
}
