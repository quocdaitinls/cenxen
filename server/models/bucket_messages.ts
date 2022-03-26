import {
  DocumentType,
  modelOptions,
  mongoose,
  prop,
  Ref,
} from "@typegoose/typegoose";
import {WhatIsIt} from "@typegoose/typegoose/lib/internal/constants";
import {Field, Int, ObjectType} from "type-graphql";
import {ChatRoom} from "./chatroom";
import {Message} from "./message";
import {Schema_Id} from "./interface_type/schema_id";
import {
  SchemaOptions_Timestamps,
  Schema_Timestamps,
} from "./interface_type/schema_timestamp";

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
export class BucketMessages {
  @Field((type) => Int)
  @prop({type: Number, default: 0})
  count: number;

  @Field((type) => String)
  @prop({ref: () => ChatRoom, required: true})
  chatroom_id: Ref<ChatRoom>;

  @Field((type) => [Message])
  @prop({type: () => [Message]}, WhatIsIt.ARRAY)
  messages: mongoose.Types.DocumentArray<DocumentType<Message>>;
}

// Interfaces
export interface MongooseInput_BuildBucketMessages {
  chatroom_id: string;
}
