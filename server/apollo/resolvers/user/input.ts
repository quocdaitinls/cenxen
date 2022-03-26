import {Field, InputType, Int} from "type-graphql";

@InputType()
export class Input_Register {
  @Field((type) => String)
  username: string;

  @Field((type) => String)
  password: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String, {nullable: true})
  phone?: string;
}

@InputType()
export class Input_ConfirmEmail {
  @Field((type) => String)
  token: string;
}

//

@InputType()
export class Input_UpdateUser_Auth {
  @Field((type) => String, {nullable: true})
  password?: string;
}

@InputType()
export class Input_UpdateUser_Profile {
  @Field((type) => String, {nullable: true})
  name?: string;

  @Field((type) => String, {nullable: true})
  avatar_id?: string;

  @Field((type) => Int, {nullable: true})
  age?: number;

  @Field((type) => String, {nullable: true})
  phone?: string;

  @Field((type) => String, {nullable: true})
  email?: string;
}

@InputType()
export class Input_UpdateUser {
  @Field((type) => String)
  id: string;

  @Field((type) => Input_UpdateUser_Auth, {nullable: true})
  auth?: Input_UpdateUser_Auth;

  @Field((type) => Input_UpdateUser_Profile, {nullable: true})
  profile?: Input_UpdateUser_Profile;

  @Field((type) => Boolean, {nullable: true})
  delete?: boolean;
}

@InputType()
export class Input_ResetPassword {
  @Field((type) => String)
  token: string;

  @Field((type) => String)
  new_password: string;
}
