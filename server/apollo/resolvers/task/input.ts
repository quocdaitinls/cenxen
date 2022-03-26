import {MongooseInput_BuildTask, MongooseInput_UpdateTask} from "@models/task";
import {MongooseInput_BuildComment} from "@models/task_comment";
import {Input_Schedule} from "@s_apollo/lib/input/schedule";
import {Field, InputType, Int} from "type-graphql";
import {Piorities} from "server/types/enum";
import {Input_CreateFile} from "../file/input";

@InputType()
export class Input_CreateTask implements Partial<MongooseInput_BuildTask> {
  @Field((type) => String)
  name: string;

  @Field((type) => String)
  creator_id: string;

  @Field((type) => [String])
  executors: string[];

  @Field((type) => String, {nullable: true})
  description?: string;

  @Field((type) => String, {nullable: true})
  section_id?: string;

  @Field((type) => String, {nullable: true})
  parent_id?: string;

  @Field((type) => Input_Schedule, {nullable: true})
  schedule?: Input_Schedule;

  @Field((type) => Piorities, {nullable: true})
  piority?: Piorities;

  @Field((type) => String, {nullable: true})
  sync_id?: string;
}

@InputType()
export class Input_UpdateTask implements Partial<MongooseInput_UpdateTask> {
  @Field((type) => String)
  id: string;

  @Field((type) => String, {nullable: true})
  name?: string;

  @Field((type) => String, {nullable: true})
  description?: string;

  @Field((type) => String, {nullable: true})
  section_id?: string;

  @Field((type) => String, {nullable: true})
  parent_id?: string;

  @Field((type) => [String], {nullable: true})
  executors?: string[];

  @Field((type) => Input_Schedule, {nullable: true})
  schedule?: Input_Schedule;

  @Field((type) => Piorities, {nullable: true})
  piority?: Piorities;

  @Field((type) => Boolean, {nullable: true})
  is_deleted?: boolean;

  @Field((type) => Boolean, {nullable: true})
  is_archived?: boolean;

  @Field((type) => Boolean, {nullable: true})
  delete?: boolean;
}

@InputType()
export class Input_CreateComment
  implements Partial<MongooseInput_BuildComment>
{
  @Field((type) => String)
  creator_id: string;

  @Field((type) => String, {nullable: true})
  content?: string;

  @Field((type) => [Input_CreateFile], {nullable: true})
  files?: Input_CreateFile[];

  @Field((type) => String, {nullable: true})
  sync_id?: string;
}

// Fetch comments input
@InputType()
export class Input_FetchComments_ByPoint {
  @Field((type) => String)
  point: string;

  @Field((type) => Int, {nullable: true})
  length?: number;

  @Field((type) => Boolean, {nullable: true})
  newer?: boolean;
}

@InputType()
export class Input_FetchComments {
  @Field((type) => [String], {nullable: true})
  by_ids?: string[];

  @Field((type) => Input_FetchComments_ByPoint, {nullable: true})
  by_point?: Input_FetchComments_ByPoint;
}

//
