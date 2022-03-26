import {CexContext} from "@s_apollo";
import {MiddlewareFn} from "type-graphql";

export const RequireAuth: MiddlewareFn<CexContext> = async (
  {context},
  next
) => {
  const {req} = context;
  const {currentUser} = req;

  if (currentUser) await next();
};
