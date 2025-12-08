const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // e.g., smtp.gmail.com
  port: process.env.EMAIL_PORT, 
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send email function
async function sendEmail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"Hirent App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Email sending failed:", err);
  }
}

module.exports = { sendEmail };
