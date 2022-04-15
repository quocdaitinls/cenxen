import {ChatRoomModel} from "@db";
import {ChatRoom, ChatRoomMember} from "@db/object";
import {DocumentType} from "@typegoose/typegoose";
import {deleteProps} from "@utils/x";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import {
  Input_CreateChatRoom,
  Input_UpdateChatRoom,
  Input_UpdateChatRoom_Member,
} from "./input";

@Resolver()
export class ChatRoom_QueryResolver {
  @Query((returns) => ChatRoom, {nullable: true})
  async chatroom(@Arg("id") id: string) {
    const ChatRoom = await ChatRoomModel.findById(id);
    return ChatRoom;
  }

  @Query((returns) => [ChatRoom])
  async chatrooms(
    @Arg("ids", (type) => [String], {nullable: true}) ids?: string[]
  ) {
    const ChatRooms = await ChatRoomModel.find(ids?.length ? {id: ids} : {});
    return ChatRooms;
  }
}

@Resolver()
export class ChatRoom_MutationResolver {
  @Mutation((returns) => ChatRoom)
  async create_chatroom(@Arg("input") input: Input_CreateChatRoom) {
    const newChatRoom = await ChatRoomModel.create(input);
    return newChatRoom;
  }

  @Mutation((returns) => ChatRoom)
  async update_chatroom(@Arg("input") input: Input_UpdateChatRoom) {
    const {id} = input;

    if (input.delete) {
      await ChatRoomModel.findByIdAndDelete(id);
      return;
    }

    const updateValue = deleteProps(input, "id");
    const chatroom = await ChatRoomModel.findByIdAndUpdate(id, updateValue, {
      new: true,
    });
    return chatroom;
  }
}

@Resolver((of) => ChatRoom)
export class ChatRoom_FieldResolver {
  @FieldResolver((returns) => [ChatRoomMember])
  async update_members(
    @Root() root: DocumentType<ChatRoom>,
    @Arg("input", (type) => Input_UpdateChatRoom_Member)
    input: Input_UpdateChatRoom_Member[]
  ) {
    input.forEach((memberUpdate) => {
      const {user_id} = memberUpdate;

      if (memberUpdate.delete) {
        root.members.id(user_id).remove();
        return;
      }

      const updateValue = deleteProps(memberUpdate, "user_id");
      const member = root.members.id(user_id);
      member.set(updateValue);
    });

    await root.save();
    return root.members;
  }
}
