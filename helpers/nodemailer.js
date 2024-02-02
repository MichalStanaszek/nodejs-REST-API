import nodemailer from "nodemailer";

const config = {
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    password: process.env.NODEMAILER_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

export const sendEmail = () => {
  try {
    const emailOptions = {
      from: "postmaster@sandboxc60bb50fb705400f8e652c1a9a6a3b3f.mailgun.org",
      to: "michal.stanaszek@gmail.com", //user.email, żeby wysłać do naszego usera z zadania
      subject: "Nodemailer test",
      text: "Cześć. Testujemy wysyłanie wiadomości!", //może link do zweryfikowania maila <a href = endpoint do veryfikacji
    };

    transporter
      .sendMail(emailOptions)
      .then((info) => console.log(info))
      .catch((err) => console.log(err));
  } catch (error) {
    console.error(error.message);
  }
};
