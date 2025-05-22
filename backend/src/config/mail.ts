import nodemailer from 'nodemailer';

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

export const sendEmail = async (to: string, subject: string, body: string) => {
    await transporter.sendMail({
    from: process.env.FROM_EMAIL, // sender address
    to: to, // list of receivers
    subject:subject,
    html: body, // HTML body
    });
}