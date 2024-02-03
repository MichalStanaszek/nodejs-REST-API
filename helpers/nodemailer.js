import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();

const config = {
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    password: process.env.NODEMAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

export const sendEmail = (verificationToken) => {
  const transporter = nodemailer.createTransport(config);
  const verificationLink = `http://localhost:3000/api/users/verify/${verificationToken}`;

  const emailOptions = {
    from: "postmaster@sandboxc60bb50fb705400f8e652c1a9a6a3b3f.mailgun.org",
    to: "michal.stanaszek@gmail.com", //user.email, żeby wysłać do naszego usera z zadania
    subject: "Nodemailer test",
    text: "Cześć. Testujemy wysyłanie wiadomości!",
    html: `<p>Kliknij <a href="${verificationLink}">tutaj</a> aby zweryfikować swój adres e-mail.</p>`,
  };

  transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};
