import {FileModel} from "@db";
import {TaskComment} from "@db/object";
import {DocumentType} from "@typegoose/typegoose";
import {FieldResolver, Resolver, Root} from "type-graphql";

@Resolver()
export class TaskComment_QueryResolver {}

@Resolver()
export class TaskComment_MutationResolver {}

@Resolver((of) => TaskComment)
export class TaskComment_FieldResolver {
  @FieldResolver()
  async files(@Root() root: DocumentType<TaskComment>) {
    const files = await FileModel.find({_id: root.file_ids});
    return files;
  }
}
