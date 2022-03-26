import jwt from "jsonwebtoken";

export interface ResetPasswordPayload extends jwt.JwtPayload {
  email: string;
}

export const createResetPasswordToken = (email: string) => {
  const secretKey = process.env.ACTIVE_USER_SECRET_KEY;
  const payload: ResetPasswordPayload = {email};
  return jwt.sign(payload, secretKey, {expiresIn: "5m"});
};

export const verifyResetPasswordToken = (
  token: string
): ResetPasswordPayload => {
  const secretKey = process.env.ACTIVE_USER_SECRET_KEY;
  try {
    const payload = jwt.verify(token, secretKey) as ResetPasswordPayload;
    return payload;
  } catch (err) {
    return null;
  }
};

export const createResetPasswordUrl = (email: string) => {
  const token = createResetPasswordToken(email);
  return `http://localhost:3000/auth/resetpassword?token=${token}`;
};
