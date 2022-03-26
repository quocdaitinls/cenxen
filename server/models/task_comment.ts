import emotionPlugin from "@models/plugins/emotionPlugin";
import {modelOptions, mongoose, plugin, prop, Ref} from "@typegoose/typegoose";
import {WhatIsIt} from "@typegoose/typegoose/lib/internal/constants";
import {Field, ObjectType} from "type-graphql";

import {Task} from "./task";
import JSON_Type from "graphql-type-json";
import {File} from "./file";
import {
  SchemaOptions_Timestamps,
  Schema_Timestamps,
} from "./interface_type/schema_timestamp";
import {Schema_Id} from "./interface_type/schema_id";
import {User} from "./user";

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
// @plugin(emotionPlugin)
export class TaskComment {
  @Field((type) => String)
  @prop({ref: () => Task, required: true})
  task_id: Ref<Task>;

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

export class MongooseInput_BuildComment {
  creator_id: string;
  task_id: string;
  sync_id?: string;
  content?: string;
  file_ids?: string[];
}
