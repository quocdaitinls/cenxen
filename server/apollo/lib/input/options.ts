import {Field, InputType} from "type-graphql";

@InputType()
export class Input_ArrayEmbedOptions {
  @Field((type) => Boolean, {nullable: true})
  fill?: boolean;
}

@InputType()
export class Input_DocOptions {
  @Field((type) => [String], {nullable: true})
  fill?: string | string[];
}
