import mongoose from "mongoose";
import {
  DocumentType,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import {ObjectType, Field} from "type-graphql";
import {User} from "./User";
import {WhatIsIt} from "@typegoose/typegoose/lib/internal/constants";
import {
  SchemaId,
  SchemaOptions_Timestamps,
  SchemaTimestamps,
} from "@db/interface";
import {Section} from "./Section";
import {Schedule} from "./Schedule";
import {ProjectModel} from "@db/models";

@ObjectType({implements: [SchemaId, SchemaTimestamps]})
@modelOptions({
  schemaOptions: {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: SchemaOptions_Timestamps,
  },
})
export class Project {
  @Field((type) => String)
  @prop({type: String, required: true})
  name: string;

  @Field((type) => [Section])
  @prop({type: () => [Section]}, WhatIsIt.ARRAY)
  sections: mongoose.Types.DocumentArray<DocumentType<Section>>;

  @Field((type) => Schedule)
  @prop({type: () => Schedule, default: () => ({})})
  schedule: Schedule;

  @Field((type) => Boolean)
  @prop({type: Boolean, default: false})
  is_deleted: boolean;

  @Field((type) => Boolean)
  @prop({type: Boolean, default: false})
  is_archived: boolean;

  @Field((type) => [String])
  @prop({ref: () => User}, WhatIsIt.ARRAY)
  executors: Ref<User>[];

  @Field((type) => String)
  @prop({ref: () => User, required: true, immutable: true})
  creator_id: Ref<User>;

  @Field((type) => String, {nullable: true})
  @prop({type: String, default: null, immutable: true})
  sync_id: string;

  @Field((type) => Section)
  section: Section;

  public static async build(
    this: ReturnModelType<typeof Project>,
    input: MongooseInput_BuildProject
  ) {
    return ProjectModel.create(input);
  }
}

/* Interface */

export interface MongooseInput_BuildProject {
  name: string;
  creator_id: string;
  executors: string[];
  schedule?: Schedule;
  sync_id?: string;
}

export interface MongooseInput_UpdateProject {
  name?: string;
  executors?: string[];
  schedule?: Schedule;
  is_deleted?: boolean;
  is_archived?: boolean;
  sync_id?: string;
}
