import nodemailer from "nodemailer";

export const createGmailTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "cenxen.helper@gmail.com",
      pass: "cenxen123",
    },
  });
  return transporter;
};
