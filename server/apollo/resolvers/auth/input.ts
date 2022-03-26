import {Field, InputType, Int} from "type-graphql";

@InputType()
export class Input_Login {
  @Field((type) => String)
  username: string;

  @Field((type) => String)
  password: string;
}

@InputType()
export class Input_LoginWithGoogle {
  @Field((type) => String)
  token: string;
}

@InputType()
export class Input_ForgotPassword {
  @Field((type) => String)
  email: string;
}
