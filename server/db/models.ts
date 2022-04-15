import {getModelForClass} from "@typegoose/typegoose";
import {
  BucketMessages,
  ChatRoom,
  File,
  Message,
  Project,
  Section,
  Task,
  TaskComment,
  User,
} from "./object";

export const UserModel = getModelForClass(User);
export const FileModel = getModelForClass(File);
export const ProjectModel = getModelForClass(Project);
export const SectionModel = getModelForClass(Section);
export const TaskModel = getModelForClass(Task);
export const TaskCommentModel = getModelForClass(TaskComment);
export const ChatRoomModel = getModelForClass(ChatRoom);
export const BucketMessagesModel = getModelForClass(BucketMessages);
export const MessageModel = getModelForClass(Message);
