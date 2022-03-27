import {
  TokenName,
  UserPayload,
  verifyJwt,
} from "@s_apollo/resolvers/auth/lib/services";
import {MiddlewareFn} from "type-graphql";
import {CexContext} from "../index";

export const CurrentUser: MiddlewareFn<CexContext> = async (
  {context},
  next
) => {
  const {req} = context;
  const {
    cookies: {access_token},
  } = req;

  const payload = verifyJwt<UserPayload>(access_token, TokenName.ACCESS);
  if (payload) {
    req.currentUser = payload.id;
  } else req.currentUser = null;

  await next();
};
