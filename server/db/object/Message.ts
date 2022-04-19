import mongoose from "mongoose";
import {modelOptions, prop, Ref} from "@typegoose/typegoose";
import {WhatIsIt} from "@typegoose/typegoose/lib/internal/constants";
import {Field, ObjectType} from "type-graphql";
import {MessageBucket} from "./MessageBucket";
import {File} from "./File";
import JSON_Type from "graphql-type-json";
import {User} from "./User";
import {ChatRoom} from "./ChatRoom";
import {
  SchemaId,
  SchemaOptions_Timestamps,
  SchemaTimestamps,
} from "@db/interface";

@ObjectType({implements: [SchemaId, SchemaTimestamps]})
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
  @prop({ref: () => MessageBucket, required: true})
  bucket_id: Ref<MessageBucket>;

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
