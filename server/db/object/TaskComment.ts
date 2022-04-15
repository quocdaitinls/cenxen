import {
  SchemaId,
  SchemaOptions_Timestamps,
  SchemaTimestamps,
} from "@db/interface";
import {modelOptions, mongoose, prop, Ref} from "@typegoose/typegoose";
import {WhatIsIt} from "@typegoose/typegoose/lib/internal/constants";
import JSON_Type from "graphql-type-json";
import {Field, ObjectType} from "type-graphql";
import {File} from "./File";
import {Task} from "./Task";
import {User} from "./User";

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
