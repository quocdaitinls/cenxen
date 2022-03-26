import {modelOptions, prop, Ref, ReturnModelType} from "@typegoose/typegoose";
import {Field, Int, ObjectType} from "type-graphql";
import {SectionModel} from ".";
import {Project} from "./project";
import {Schema_Id} from "./interface_type/schema_id";
import {
  SchemaOptions_Timestamps,
  Schema_Timestamps,
} from "./interface_type/schema_timestamp";
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
