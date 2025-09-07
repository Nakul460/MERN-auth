import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
  host: `${process.env.SMTP}`,
  port: 465,
  secure: true, 
  auth: {
    user: `${process.env.SENDER}`,
    pass: `${process.env.PASSWORD}` 
  }
});

console.log("Nodemailer transporter created successfully");


export default transporter;
