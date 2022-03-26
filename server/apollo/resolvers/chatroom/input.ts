import {Field, InputType} from "type-graphql";

@InputType()
export class Input_CreateChatRoom_Member {
  @Field((type) => String)
  user_id: string;

  @Field((type) => String)
  is_admin: string;
}

@InputType()
export class Input_CreateChatRoom {
  @Field((type) => String)
  name: string;

  @Field((type) => String)
  creator_id: string;

  @Field((type) => [Input_CreateChatRoom_Member])
  members: Input_CreateChatRoom_Member[];

  @Field((type) => String, {nullable: true})
  sync_id?: string;
}

@InputType()
export class Input_UpdateChatRoom {
  @Field((type) => String)
  id: string;

  @Field((type) => String, {nullable: true})
  name?: string;

  @Field((type) => String, {nullable: true})
  avatar_id?: string;

  @Field((type) => String, {nullable: true})
  last_message?: string;

  @Field((type) => String, {nullable: true})
  last_bucket_id?: string;

  @Field((type) => Boolean, {nullable: true})
  is_deleted?: boolean;

  @Field((type) => Boolean, {nullable: true})
  is_archived?: boolean;

  @Field((type) => [Input_UpdateChatRoom_Member], {nullable: true})
  members?: Input_UpdateChatRoom_Member[];

  @Field((type) => Boolean, {nullable: true})
  delete?: boolean;
}

@InputType()
export class Input_UpdateChatRoom_Member {
  @Field((type) => String)
  user_id: string;

  @Field((type) => String, {nullable: true})
  nickname?: string;

  @Field((type) => String, {nullable: true})
  seen_id?: string;

  @Field((type) => Boolean, {nullable: true})
  is_admin?: boolean;

  @Field((type) => Boolean, {nullable: true})
  delete?: boolean;
}
