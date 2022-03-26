import {MailOptions} from "nodemailer/lib/sendmail-transport";

export const createConfirmEmailOptions = (
  email: string,
  confirmLink: string
): MailOptions => {
  return {
    from: "Cenxen",
    to: email,
    subject: "Confirm Email",
    html: `<div>
      <p>Click here to confirm email</p> 
      <a href="${confirmLink}">${confirmLink}</a>
    </div>`,
  };
};
