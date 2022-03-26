import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class AuthResponseData {
  @Field((type) => String)
  access_token: string;

  @Field((type) => String)
  refresh_token: string;
}
