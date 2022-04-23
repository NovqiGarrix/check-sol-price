import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const MY_EMAIL = process.env.EMAIL;
const MY_PASSWORD = process.env.PASSWORD;

const sendEmail = async (label: string, message: string, to: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MY_EMAIL,
      pass: MY_PASSWORD,
    },
    from: "SOLANA CHECKING PRICE SYSTEM",
    sender: "SOLANA BOT",
    priority: "high",
  });

  const emailDetails = {
    from: "SOLANA CHECKING PRICE SYSTEM",
    to,
    subject: label,
    text: message,
  };
  const { accepted } = await transporter.sendMail(emailDetails);

  return accepted;
};

export default sendEmail
