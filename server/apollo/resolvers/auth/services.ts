import {User} from "@models/user";
import {DocumentType} from "@typegoose/typegoose";
// import {getPrivateKey, signJwt, TokenName} from "@utils/jwt";
import {isUndefined} from "@utils/x";
import {JwtPayload} from "jsonwebtoken";
import {CexResponse} from "server/types/express";
import jwt from "jsonwebtoken";
import {createResetPasswordUrl} from "@s_apollo/utils/links/resetPasswordUrl";
import {createResetPasswordOptions} from "@s_apollo/utils/email/resetPasswordOptions";
import {createGmailTransporter} from "@s_apollo/utils/mailTransporter/gmailTransporter";
import {AuthResponseData} from "./def";
import {CookieOptions} from "express";
import {LoginTicket, OAuth2Client} from "google-auth-library";

export enum TokenName {
  ACCESS = "access_token",
  REFRESH = "refresh_token",
}

export interface UserPayload extends JwtPayload {
  id: string;
  email: string;
}

export interface CexAuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

type TokenInfo = {
  privateKey: string;
  time: string;
};

export const createPayload = (user: DocumentType<User>): UserPayload => {
  const {
    id,
    profile: {email},
  } = user;
  return {id, email};
};

export const getTokenPrivateKey = (keyName: TokenName) => {
  return keyName === TokenName.ACCESS
    ? process.env.ACCESS_TOKEN_PRIVATE_KEY
    : process.env.REFRESH_TOKEN_PRIVATE_KEY;
};

export const getTokenTime = (keyName: TokenName) => {
  return keyName === TokenName.ACCESS
    ? process.env.ACCESS_TOKEN_TIME
    : process.env.REFRESH_TOKEN_TIME;
};

const getTokenInfo = (token: TokenName): TokenInfo => {
  const privateKey = getTokenPrivateKey(token);
  const time = getTokenTime(token);
  return {privateKey, time};
};

export const signToken = (token: TokenName, payload: UserPayload) => {
  const tokenInfo = getTokenInfo(token);
  return jwt.sign(payload, tokenInfo.privateKey, {expiresIn: tokenInfo.time});
};

export const signPairToken = (user: DocumentType<User>): [string, string] => {
  const payload = createPayload(user);
  const accessToken = signToken(TokenName.ACCESS, payload);
  const refreshToken = signToken(TokenName.REFRESH, payload);
  return [accessToken, refreshToken];
};

export const createAuthTokens = (
  accessToken: string,
  refreshToken: string
): CexAuthTokens => ({accessToken, refreshToken});

export const setTokensOnCookie = (res: CexResponse, tokens: CexAuthTokens) => {
  const {accessToken, refreshToken} = tokens;
  const options: CookieOptions = {httpOnly: true, sameSite: true, secure: true};

  if (!isUndefined(accessToken))
    res.cookie("access_token", accessToken, options);

  if (!isUndefined(refreshToken))
    res.cookie("refresh_token", refreshToken, options);
};

export const convertTokensToReturnType = (
  tokens: CexAuthTokens
): AuthResponseData => ({
  access_token: tokens.accessToken,
  refresh_token: tokens.refreshToken,
});

export const verifyJwt = <T>(token: string, keyName: TokenName): T | null => {
  const privateKey = getTokenPrivateKey(keyName);

  try {
    const decoded = jwt.verify(token, privateKey) as T;
    return decoded;
  } catch (err) {
    return null;
  }
};

export const sendResetPasswordEmail = async (email: string) => {
  const url = createResetPasswordUrl(email);
  const transporter = createGmailTransporter();
  const mailOptions = createResetPasswordOptions(email, url);

  return transporter.sendMail(mailOptions);
};

export const getGoogleLoginTicket = async (
  token: string
): Promise<LoginTicket> => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  return ticket;
};
