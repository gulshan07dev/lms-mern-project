import nodemailer from "nodemailer";


const sendEmail = async function (email, subject, message) {
  // create reusable transporter object using the default SMTP transport 
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: `LMS Skills <${process.env.SMTP_FROM_EMAIL}>`, // sender address
    to: email, // user email
    subject: subject, // Subject line
    text: message, // html body
  });
};

export default sendEmail;
