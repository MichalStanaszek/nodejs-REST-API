import nodemailer from "nodemailer";

const config = {
  host: "smtp.mailgun.org",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

export const sendEmail = (email, verificationToken) => {
  const transporter = nodemailer.createTransport(config);
  const verificationLink = `http://localhost:3000/api/users/verify/${verificationToken}`;

  const emailOptions = {
    from: "postmaster@sandboxc60bb50fb705400f8e652c1a9a6a3b3f.mailgun.org",
    to: email,
    subject: "Nodemailer test",
    text: "Cześć. Testujemy wysyłanie wiadomości!",
    html: `<a href="${verificationLink}">Kliknij link, aby zweryfikować swój adres e-mail: ${verificationLink}</a>`,
  };

  transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};
