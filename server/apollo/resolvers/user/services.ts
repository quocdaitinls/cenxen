import {createConfirmEmailUrl} from "@s_apollo/utils/links/confirmEmailUrl";
import {createConfirmEmailOptions} from "@s_apollo/utils/email/confirmEmailOptions";
import {createGmailTransporter} from "@s_apollo/utils/mailTransporter/gmailTransporter";

export const sendConfirmEmail = async (email: string) => {
  const url = createConfirmEmailUrl(email);
  const transporter = createGmailTransporter();
  const mailOptions = createConfirmEmailOptions(email, url);

  return transporter.sendMail(mailOptions);
};
