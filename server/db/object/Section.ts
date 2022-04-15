import {
  SchemaId,
  SchemaOptions_Timestamps,
  SchemaTimestamps,
} from "@db/interface";
import {modelOptions, prop, Ref} from "@typegoose/typegoose";
import {Field, Int, ObjectType} from "type-graphql";
import {Project} from "./Project";
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
export class Section {
  @Field((type) => String)
  @prop({type: String, required: true})
  name: string;

  @Field((type) => String)
  @prop({ref: () => Project, required: true, immutable: true})
  project_id: Ref<Project>;

  @Field((type) => Int)
  @prop({type: Number, required: true})
  section_order: number;

  @Field((type) => Boolean)
  @prop({type: Boolean, default: false})
  is_deleted: boolean;

  @Field((type) => Boolean)
  @prop({type: Boolean, default: false})
  is_archived: boolean;

  @Field((type) => String, {nullable: true})
  @prop({ref: () => User, default: null})
  creator_id: Ref<User>;

  @Field((type) => String, {nullable: true})
  @prop({type: String, default: null, immutable: true})
  sync_id: string;
}

export interface MongooseInput_BuildSection {
  name: string;
  project_id: string;
  creator_id: string;
  section_order: number;
  sync_id?: string;
}

export interface MongooseInput_UpdateSection {
  name?: string;
  section_order?: number;
  is_deleted?: boolean;
  is_archived?: boolean;
  sync_id?: string;
}
