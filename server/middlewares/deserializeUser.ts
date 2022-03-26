import {TokenName, verifyJwt} from "@utils/jwt";
import {JwtPayload, verify} from "jsonwebtoken";
import {CexRequestHandler} from "server/types/express";

export interface UserPayload extends JwtPayload {
  id: string;
  username: string;
}

const deserializeUser: CexRequestHandler = (req, res, next) => {
  const accessToken = (req.headers.authorization || "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) {
    next();
  }

  const decoded = verifyJwt<UserPayload>(accessToken, TokenName.ACCESS);

  if (decoded) {
    res.locals.user = decoded.id;
  }

  return next();
};

export default deserializeUser;
