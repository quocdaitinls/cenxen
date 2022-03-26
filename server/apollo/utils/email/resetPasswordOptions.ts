import {MailOptions} from "nodemailer/lib/sendmail-transport";

export const createResetPasswordOptions = (
  email: string,
  resetLink: string
): MailOptions => {
  return {
    from: "Cenxen",
    to: email,
    subject: "Reset Password",
    html: `<div>
      <p>Click the link below to reset password</p>
      <a href="${resetLink}">${resetLink}</a>  
    </div>`,
  };
};
