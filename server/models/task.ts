import {
  DocumentType,
  modelOptions,
  mongoose,
  prop,
  Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import {WhatIsIt} from "@typegoose/typegoose/lib/internal/constants";
import {isNull} from "@utils/x";
import {ObjectId} from "mongoose";
import {Field, ObjectType} from "type-graphql";
import {TaskModel} from ".";
import {Section} from "./section";
import {Schedule} from "./lib/schedule";
import {Schema_Id} from "./interface_type/schema_id";
import {TaskComment} from "./task_comment";
import {
  SchemaOptions_Timestamps,
  Schema_Timestamps,
} from "./interface_type/schema_timestamp";
import {User} from "./user";
import {Piorities} from "server/types/enum";

@ObjectType({implements: [Schema_Id, Schema_Timestamps]})
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
export class Task {
  @Field((type) => String)
  @prop({type: String, required: true})
  name: string;

  @Field((type) => String)
  @prop({type: String, default: ""})
  description: string;

  @Field((type) => String, {nullable: true})
  @prop({
    ref: () => Task,
    set: function (this: DocumentType<Task>, val: string | ObjectId) {
      if (!isNull(val) && val instanceof mongoose.Types.ObjectId)
        val = val.toString();
      if (this.parent_id?.toString() !== val)
        this.previous_parent_id = this.parent_id;
      return val;
    },
    default: null,
  })
  parent_id: Ref<Task>;

  @Field((type) => [String])
  @prop({ref: () => Task}, WhatIsIt.ARRAY)
  ancestors: Ref<Task>[];

  @Field((type) => String, {nullable: true})
  @prop({
    ref: () => Section,
    set: function (this: DocumentType<Task>, val: string | ObjectId) {
      if (!isNull(val) && val instanceof mongoose.Types.ObjectId)
        val = val.toString();
      if (this.section_id?.toString() !== val)
        this.previous_section_id = this.section_id;
      return val;
    },
    default: null,
  })
  section_id: Ref<Section>;

  @Field((type) => [String])
  @prop({ref: () => User}, WhatIsIt.ARRAY)
  executors: Ref<User>[];

  @Field((type) => [TaskComment], {nullable: true})
  @prop({type: () => [TaskComment]}, WhatIsIt.ARRAY)
  comments: mongoose.Types.DocumentArray<DocumentType<TaskComment>>;

  @Field((type) => Schedule)
  @prop({type: () => Schedule, default: () => ({})})
  schedule: Schedule;

  @Field((type) => Piorities)
  @prop({type: String, enum: Piorities, default: Piorities.MEDIUM})
  piority: Piorities;

  @Field((type) => Boolean)
  @prop({type: Boolean, default: false})
  is_deleted: boolean;

  @Field((type) => Boolean)
  @prop({type: Boolean, default: false})
  is_archived: boolean;

  @Field((type) => String, {nullable: true})
  @prop({ref: () => Task, default: null})
  previous_parent_id: Ref<Task>;

  @Field((type) => String, {nullable: true})
  @prop({ref: () => Section, default: null})
  previous_section_id: Ref<Section>;

  @Field((type) => String, {nullable: true})
  @prop({ref: () => User, default: null})
  creator_id: Ref<User>;

  @Field((type) => String, {nullable: true})
  @prop({type: String, default: null, immutable: true})
  sync_id: string;

  @Field((type) => TaskComment)
  create_comment: TaskComment;

  public static async build(
    this: ReturnModelType<typeof Task>,
    input: MongooseInput_BuildTask
  ): Promise<DocumentType<Task>> {
    return this.create(input);
  }

  public async findChilds(
    this: DocumentType<Task>
  ): Promise<DocumentType<Task>[]> {
    return TaskModel.find({parent_id: this._id}).exec();
  }

  public async findParent(
    this: DocumentType<Task>
  ): Promise<DocumentType<Task>> {
    return TaskModel.findById(this.parent_id).exec();
  }

  public async findRoot(this: DocumentType<Task>): Promise<DocumentType<Task>> {
    const rootId = this.ancestors[0];
    return TaskModel.findById(rootId).exec();
  }

  public async findDescendants(
    this: DocumentType<Task>
  ): Promise<DocumentType<Task>[]> {
    return TaskModel.find({ancestors: this._id}).exec();
  }

  public isDescendantOf(this: DocumentType<Task>, id: string) {
    const index = this.ancestors.findIndex(
      (ancestorId) => ancestorId.toString() === id
    );
    return index >= 0;
  }
}

/* Interfaces */

export interface MongooseInput_BuildTask {
  name: string;
  creator_id: string;
  executors: string[];
  description?: string;
  section_id?: string;
  parent_id?: string;
  ancestors?: string[];
  schedule?: Schedule;
  piority?: Piorities;
  sync_id?: string;
}

export interface MongooseInput_UpdateTask {
  name?: string;
  executors?: string[];
  description?: string;
  section_id?: string;
  parent_id?: string;
  ancestors?: string[];
  schedule?: Schedule;
  piority?: Piorities;
  is_deleted?: boolean;
  is_archived?: boolean;
}
