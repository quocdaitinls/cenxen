import {UserModel} from "@db";
import {User} from "@db/object";
import {CexContext} from "@s_apollo";
import {Ctx, Query, Resolver} from "type-graphql";
import {AuthResponseData} from "./lib/def";
import {
  convertTokensToReturnType,
  createAuthTokens,
  setTokensOnCookie,
  signToken,
  TokenName,
  UserPayload,
  verifyJwt,
} from "./lib/services";

@Resolver()
export class Auth_QueryResolver {
  @Query((returns) => User, {nullable: true})
  async me(@Ctx() ctx: CexContext) {
    const meID = ctx.req.currentUser;
    if (!meID) return null;
    const me = await UserModel.findById(meID);
    return me;
  }

  @Query((returns) => AuthResponseData)
  async refresh_token(@Ctx() ctx: CexContext): Promise<AuthResponseData> {
    const {req, res} = ctx;
    const {
      cookies: {access_token, refresh_token},
    } = req;

    // If accessToken hasn't been expired, set old accessToken and refreshToken
    if (access_token) {
      const payload = verifyJwt<UserPayload>(access_token, TokenName.ACCESS);
      if (payload) {
        const tokens = createAuthTokens(access_token, refresh_token);
        setTokensOnCookie(res, tokens);
        return convertTokensToReturnType(tokens);
      }
    }

    // If accessToken expired, create new
    if (refresh_token) {
      const payload = verifyJwt<UserPayload>(access_token, TokenName.REFRESH);
      if (payload) {
        const newAccessToken = signToken(TokenName.ACCESS, payload);
        const tokens = createAuthTokens(newAccessToken, refresh_token);
        setTokensOnCookie(res, tokens);
        return convertTokensToReturnType(tokens);
      }
    }

    return null;
  }
}
