import mongoose from "mongoose";
import {
  DocumentType,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import {WhatIsIt} from "@typegoose/typegoose/lib/internal/constants";
import {User} from "./user";
import {File} from "./file";
import {BucketMessages} from "./bucket_messages";
import {Message} from "./message";
import {Field, ObjectType} from "type-graphql";
import {Schema_Id} from "./interface_type/schema_id";
import {
  SchemaOptions_Timestamps,
  Schema_Timestamps,
} from "./interface_type/schema_timestamp";

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
  @prop({ref: () => BucketMessages, default: null})
  last_bucket_id: Ref<BucketMessages>;

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
