import {UserModel} from "@models";
import {User} from "@models/user";
import {CexContext} from "@s_apollo";
import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {AuthResponseData} from "./def";
import {
  Input_ForgotPassword,
  Input_Login,
  Input_LoginWithGoogle,
} from "./input";
import {
  convertTokensToReturnType,
  createAuthTokens,
  getGoogleLoginTicket,
  sendResetPasswordEmail,
  setTokensOnCookie,
  signPairToken,
  signToken,
  TokenName,
  UserPayload,
  verifyJwt,
} from "./services";

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

@Resolver()
export class Auth_MutationResolver {
  @Mutation((returns) => AuthResponseData)
  async login(
    @Arg("input") input: Input_Login,
    @Ctx() ctx: CexContext
  ): Promise<AuthResponseData> {
    const {res} = ctx;
    const {username, password} = input;
    const user = await UserModel.findByUsername(username);

    if (!user) throw new Error("User not exist.");
    if (!user?.active) throw new Error("User isn't actived.");

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) throw new Error("Invalid password.");

    const tokens = createAuthTokens(...signPairToken(user));
    setTokensOnCookie(res, tokens);
    return convertTokensToReturnType(tokens);
  }

  @Mutation((returns) => AuthResponseData)
  async login_with_google(
    @Arg("input") input: Input_LoginWithGoogle,
    @Ctx() ctx: CexContext
  ): Promise<AuthResponseData> {
    const {res} = ctx;
    const {token} = input;
    const ticket = await getGoogleLoginTicket(token);
    const {email, name} = ticket.getPayload();

    const user = await UserModel.findByEmail(email);
    let exist = user && user.active;

    // Found user but not active
    if (user && !exist) await user.delete();

    if (!exist) {
      const newUser = await UserModel.create({profile: {email, name}});
      await newUser.activate();

      const tokens = createAuthTokens(...signPairToken(newUser));
      setTokensOnCookie(res, tokens);
      return convertTokensToReturnType(tokens);
    }

    const tokens = createAuthTokens(...signPairToken(user));
    setTokensOnCookie(res, tokens);
    return convertTokensToReturnType(tokens);
  }

  @Mutation((returns) => Boolean)
  async logout(@Ctx() ctx: CexContext) {
    const {res} = ctx;
    const tokens = createAuthTokens(null, null);
    setTokensOnCookie(res, tokens);
    return true;
  }

  @Mutation((returns) => Boolean)
  async forgot_password(@Arg("input") input: Input_ForgotPassword) {
    const {email} = input;
    const user = await UserModel.findByEmail(email);
    if (user) {
      sendResetPasswordEmail(email);
      return true;
    }
    return false;
  }
}
