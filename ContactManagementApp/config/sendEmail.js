import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
      user: process.env.MY_EMAIL, // Sender gmail address
      pass: process.env.MY_EMAIL_PASSWORD, // App password from gmail account
    },
  });

  await transporter.sendMail({
    from: process.env.MY_EMAIL,
    to: email,
    subject: subject,
    text: message,
  });
};
