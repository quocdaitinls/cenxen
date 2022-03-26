import jwt, {JwtPayload} from "jsonwebtoken";

export interface ConfirmEmailPayload extends JwtPayload {
  email: string;
}

export const createConfirmEmailToken = (email: string) => {
  const secretKey = process.env.ACTIVE_USER_SECRET_KEY;
  const payload: ConfirmEmailPayload = {email};
  return jwt.sign(payload, secretKey, {expiresIn: "5m"});
};

export const verifyConfirmEmailToken = (token: string): ConfirmEmailPayload => {
  const secretKey = process.env.ACTIVE_USER_SECRET_KEY;
  try {
    const payload = jwt.verify(token, secretKey) as ConfirmEmailPayload;
    return payload;
  } catch (err) {
    return null;
  }
};

export const createConfirmEmailUrl = (email: string) => {
  const token = createConfirmEmailToken(email);
  return `http://localhost:3000/auth/confirmemail?token=${token}`;
};
