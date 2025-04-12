import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_ENCRYPTION === 'ssl',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendMail = async ({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM_ADDRESS,
      to,
      subject,
      text,
      html,
    });

    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

