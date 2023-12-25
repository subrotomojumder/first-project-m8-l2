import nodemailer from 'nodemailer';
import config from '../config';

const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'subrotomojumder03@gmail.com',
      pass: 'nvxr vruf ztca lpzk',
    },
  });
  await transporter.sendMail({
    from: 'subrotomojumder03@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within 10 minutes!', // Subject line
    text: 'Change password!', // plain text body
    html, // html body
  });
};

export default sendEmail;
