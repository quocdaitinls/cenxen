import {FileModel, ProjectModel, TaskModel, UserModel} from "@db";
import {File, Project, Task, User, User_Profile} from "@db/object";
import {verifyConfirmEmailToken} from "@s_apollo/utils/links/confirmEmailUrl";
import {verifyResetPasswordToken} from "@s_apollo/utils/links/resetPasswordUrl";
import {DocumentType} from "@typegoose/typegoose";
import {deleteProps} from "@utils/x";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import {
  Input_ConfirmEmail,
  Input_Register,
  Input_ResetPassword,
  Input_UpdateUser,
} from "./input";
import {sendConfirmEmail} from "./services";

@Resolver()
export class User_QueryResolver {
  @Query((returns) => User, {nullable: true})
  async user(@Arg("id") id: string) {
    const user = await UserModel.findById(id);
    return user;
  }

  @Query((returns) => [User])
  async users(
    @Arg("ids", (type) => [String], {nullable: true}) ids?: string[]
  ) {
    const users = await UserModel.find(ids?.length ? {id: ids} : {});
    return users;
  }
}

@Resolver()
export class User_MutationResolver {
  @Mutation((returns) => Boolean)
  async register(@Arg("input") input: Input_Register) {
    const {username} = input;
    const existUser = await UserModel.findByUsername(username);

    if (existUser && existUser?.active) return false;

    if (existUser && !existUser.active) await existUser.delete();

    const user = await UserModel.build(input);

    sendConfirmEmail(user.profile.email);
    return true;
  }

  @Mutation((returns) => Boolean)
  async confirm_email(@Arg("input") input: Input_ConfirmEmail) {
    const {token} = input;
    const payload = verifyConfirmEmailToken(token);
    if (!payload?.email) return false;

    const user = await UserModel.findByEmail(payload.email);
    await user.activate();
    return true;
  }

  @Mutation((returns) => User)
  async update_user(@Arg("input") input: Input_UpdateUser) {
    const {id} = input;

    if (input.delete) {
      await UserModel.findByIdAndDelete(id);
      return;
    }

    const updateValue = deleteProps(input, ["id", "delete"]);
    const user = await UserModel.findByIdAndUpdate(id, updateValue, {
      new: true,
    });
    return user;
  }

  @Mutation((returns) => Boolean)
  async reset_password(@Arg("input") input: Input_ResetPassword) {
    const {token, new_password} = input;
    const payload = verifyResetPasswordToken(token);

    if (!payload?.email) return false;

    const user = await UserModel.findByEmail(payload.email);
    if (!user) return false;

    user.auth.password = new_password;
    await user.save();
    return true;
  }
}

@Resolver((of) => User)
export class User_FieldResolver {
  @FieldResolver((returns) => [Project])
  async projects(@Root() root: DocumentType<User>) {
    const projects = await ProjectModel.find({executors: root.id});
    return projects;
  }

  @FieldResolver((returns) => [Task])
  async tasks(@Root() root: DocumentType<User>) {
    const tasks = await TaskModel.find({executors: root.id});
    return tasks;
  }
}

@Resolver((of) => User_Profile)
export class UserProfile_FieldResolver {
  @FieldResolver((returns) => [File], {nullable: true})
  async avatar(@Root() root: DocumentType<User_Profile>) {
    const avatar = await FileModel.findById(root.avatar_id);
    return avatar;
  }
}
