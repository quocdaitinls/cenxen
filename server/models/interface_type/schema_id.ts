import {modelOptions, prop} from "@typegoose/typegoose";
import {Field, ID, InterfaceType} from "type-graphql";

@InterfaceType()
export class Schema_Id {
  @Field((type) => ID)
  id: string;
}
