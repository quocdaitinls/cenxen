import {Input_Schedule} from "@s_apollo/lib/input/schedule";
import {Field, InputType, Int} from "type-graphql";

@InputType()
export class Input_CreateProject {
  @Field((type) => String)
  name: string;

  @Field((type) => String)
  creator_id: string;

  @Field((type) => [String])
  executors: string[];

  @Field((type) => Input_Schedule, {nullable: true})
  schedule?: Input_Schedule;

  @Field((type) => String, {nullable: true})
  sync_id?: string;
}

@InputType()
export class Input_UpdateProject {
  @Field((type) => String)
  id: string;

  @Field((type) => String, {nullable: true})
  name?: string;

  @Field((type) => [String], {nullable: true})
  executors?: string[];

  @Field((type) => Input_Schedule, {nullable: true})
  schedule?: Input_Schedule;

  @Field((type) => Boolean, {nullable: true})
  is_deleted?: boolean;

  @Field((type) => Boolean, {nullable: true})
  is_archived?: boolean;

  @Field((type) => Boolean, {nullable: true})
  delete?: boolean;
}

// Section

@InputType()
export class Input_CreateSection {
  @Field((type) => String)
  name: string;

  @Field((type) => String)
  project_id: string;

  @Field((type) => String)
  creator_id: string;

  @Field((type) => Int)
  section_order: number;

  @Field((type) => String, {nullable: true})
  sync_id?: string;
}

@InputType()
export class Input_UpdateSection {
  @Field((type) => String)
  id: string;

  @Field((type) => String, {nullable: true})
  name?: string;

  @Field((type) => Int, {nullable: true})
  section_order?: number;

  @Field((type) => Boolean, {nullable: true})
  is_deleted?: boolean;

  @Field((type) => Boolean, {nullable: true})
  is_archived?: boolean;

  @Field((type) => Boolean, {nullable: true})
  delete?: boolean;
}
