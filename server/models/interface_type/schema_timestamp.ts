import {SchemaTimestampsConfig} from "mongoose";
import {Field, InterfaceType} from "type-graphql";

@InterfaceType()
export class Schema_Timestamps {
  @Field((type) => Date)
  created_at: Date;

  @Field((type) => Date)
  updated_at: Date;
}

export const SchemaOptions_Timestamps: SchemaTimestampsConfig = {
  createdAt: "created_at",
  updatedAt: "updated_at",
};
