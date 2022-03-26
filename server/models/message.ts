import mongoose from "mongoose";
import {modelOptions, prop, Ref} from "@typegoose/typegoose";
import {WhatIsIt} from "@typegoose/typegoose/lib/internal/constants";
import {Field, ObjectType} from "type-graphql";
import {BucketMessages} from "./bucket_messages";
import {File} from "./file";
import JSON_Type from "graphql-type-json";
import {Schema_Id} from "./interface_type/schema_id";
import {
  SchemaOptions_Timestamps,
  Schema_Timestamps,
} from "./interface_type/schema_timestamp";
import {User} from "./user";
import {ChatRoom} from "./chatroom";

@ObjectType({implements: [Schema_Id, Schema_Timestamps]})
@modelOptions({
  schemaOptions: {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: SchemaOptions_Timestamps,
  },
})
export class Message {
  @Field((type) => String)
  @prop({ref: () => ChatRoom, required: true})
  chatroom_id: Ref<ChatRoom>;

  @Field((type) => String)
  @prop({ref: () => BucketMessages, required: true})
  bucket_id: Ref<BucketMessages>;

  @Field((type) => String)
  @prop({ref: () => User, required: true, immutable: true})
  creator_id: Ref<User>;

  @Field((type) => String)
  @prop({type: String, default: ""})
  content: string;

  @Field((type) => [String])
  @prop({ref: () => String}, WhatIsIt.ARRAY)
  file_ids: Ref<File>[];

  @Field((type) => JSON_Type)
  @prop({type: () => String, default: () => ({})}, WhatIsIt.MAP)
  emotions: mongoose.Types.Map<string>;

  @Field((type) => String, {nullable: true})
  @prop({type: String, default: null, immutable: true})
  sync_id: string;

  @Field((type) => [File])
  files: File[];
}
