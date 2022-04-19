import mongoose from "mongoose";
import {
  DocumentType,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import {WhatIsIt} from "@typegoose/typegoose/lib/internal/constants";
import {MessageBucket} from "./MessageBucket";
import {Field, ObjectType} from "type-graphql";
import {User} from "./User";
import {
  SchemaId,
  SchemaOptions_Timestamps,
  SchemaTimestamps,
} from "@db/interface";
import {Message} from "./Message";
import {File} from "./File";

@ObjectType()
@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class ChatRoomMember {
  @Field((type) => String)
  @prop({ref: () => User, required: true})
  user_id: Ref<User>;

  @Field((type) => Boolean)
  @prop({type: Boolean, required: true})
  is_admin: boolean;

  @Field((type) => String)
  @prop({type: String, default: ""})
  nickname: string;

  @Field((type) => String, {nullable: true})
  @prop({type: String, default: null})
  seen_id: string;
}

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
export class ChatRoom {
  @Field((type) => String, {nullable: true})
  @prop({type: String, default: null, immutable: true})
  sync_id: string;

  @Field((type) => String)
  @prop({type: String, required: true})
  name: string;

  @Field((type) => String)
  @prop({ref: () => User, required: true, immutable: true})
  creator_id: Ref<User>;

  @Field((type) => String, {nullable: true})
  @prop({ref: () => File, default: null})
  avatar_id: Ref<File>;

  @Field((type) => [ChatRoomMember])
  @prop({type: () => [ChatRoomMember]}, WhatIsIt.ARRAY)
  members: mongoose.Types.DocumentArray<DocumentType<ChatRoomMember>>;

  @Field((type) => Message, {nullable: true})
  @prop({type: Message, default: null})
  last_message: Message;

  @Field((type) => String, {nullable: true})
  @prop({ref: () => MessageBucket, default: null})
  last_bucket_id: Ref<MessageBucket>;

  @Field((type) => Boolean)
  @prop({type: Boolean, default: false})
  is_deleted: boolean;

  @Field((type) => Boolean)
  @prop({type: Boolean, default: false})
  is_archived: boolean;

  public static async build(
    this: ReturnModelType<typeof ChatRoom>,
    input: MongooseInput_BuildChatRoom
  ) {}
}

// Interfaces
export interface MongooseInput_BuildChatRoom {
  name: string;
  creator_id: string;
  members: {
    user_id: string;
    is_admin: boolean;
  }[];
  sync_id?: string;
}

export interface MongooseInput_UpdateChatRoom {
  name?: string;
  avatar_id?: string;
  last_message?: string;
  last_bucket_id?: string;
  is_deleted?: boolean;
  is_archived?: boolean;
}

export interface MongooseInput_UpdateChatRoomMember {
  user_id: string;
  nickname?: string;
  seen_id?: string;
  is_admin?: boolean;
}
