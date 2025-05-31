import nodemailer from 'nodemailer';
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    host: "process.env.SMTP_HOST",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "process.env.SMTP_USER", // generated ethereal user
        pass: "process.env.SMTP_PASSWORD", // generated ethereal password
    },
});
export const sendEmail = async (to, subject, body) => {
    await transporter.sendMail({
        from: process.env.FROM_EMAIL, // sender address
        to: to, // list of receivers
        subject: subject,
        html: body, // HTML body
    });
};
