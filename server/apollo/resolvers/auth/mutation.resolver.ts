import {UserModel} from "@db";
import {CexContext} from "@s_apollo";
import {Arg, Ctx, Mutation, Resolver} from "type-graphql";
import {AuthResponseData} from "./lib/def";
import {
  Input_ForgotPassword,
  Input_Login,
  Input_LoginWithGoogle,
} from "./lib/input";
import {
  convertTokensToReturnType,
  createAuthTokens,
  getGoogleLoginTicket,
  sendResetPasswordEmail,
  setTokensOnCookie,
  signPairToken,
} from "./lib/services";

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
