import {Field, InputType, Int} from "type-graphql";

@InputType()
export class Input_CreateFile {
  @Field((type) => String, {nullable: true})
  sync_id?: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  ext: string;

  @Field((type) => Int)
  size: number;

  @Field((type) => String)
  creator_id: string;
}

@InputType()
export class Input_UpdateFile {
  @Field((type) => String)
  id: string;

  @Field((type) => String, {nullable: true})
  name?: string;

  @Field((type) => Boolean, {nullable: true})
  is_uploaded?: boolean;

  @Field((type) => Boolean, {nullable: true})
  delete?: boolean;
}
