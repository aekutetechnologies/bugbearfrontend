import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;

        // Set up the NodeMailer transporter with your email credentials
        const transporter = nodemailer.createTransport({
            host: "smtp.example.com", // SMTP host provider (e.g., smtp.mailtrap.io)
            port: 587,
            auth: {
                user: "subham019650@gmail.com", // Your email address (or use environment variable)
                pass: "1234", // Your email password (or use environment variable)
                // user: process.env.EMAIL_USER, // Your email address (or use environment variable)
                // pass: process.env.EMAIL_PASS, // Your email password (or use environment variable)
            },
        });

        // Email options
        const mailOptions = {
            from: 'info@aekudev.com', // Sender address
            to: email, // Recipient address
            subject: 'Thank you for subscribing!',
            text: 'You have successfully subscribed to our newsletter!',
            html: '<p>You have successfully subscribed to our newsletter!</p>',
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Subscription successful!' });
        } catch (error) {
            console.error("Email sending failed:", error);
            res.status(500).json({ message: 'Subscription failed' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
