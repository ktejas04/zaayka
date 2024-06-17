import nodemailer from 'nodemailer';
// The requested module 'nodemailer' is a CommonJS module, which may not support all module.exports as named exports.
//use direct, not {}.

const sendResetEmail = async (emailData, resetToken) => {

  //CREATE TRANSPORTER
  // Use mail trap to prevent sending mails while development
    const transporter = nodemailer.createTransport({
      // service: 'gmail', // You can use other services or SMTP settings
      host: process.env.EMAIL_HOST, // You can use other services or SMTP settings
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  

    //EMail Options
    const mailOptions = {
      from: 'Zaayka Support <zaayka.kitchen@gmail.com>',
      to: emailData.email,
      subject: emailData.subject,
      text: emailData.message
    };
  
    await transporter.sendMail(mailOptions);
};

export { sendResetEmail };
  
