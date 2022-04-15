import {FileModel, TaskModel} from "@db";
import {Task, TaskComment} from "@db/object";
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
import * as TaskServices from "./services";
import {
  Input_CreateComment,
  Input_CreateTask,
  Input_FetchComments,
  Input_FetchComments_ByPoint,
  Input_UpdateTask,
} from "./input";

@Resolver()
export class Task_QueryResolver {
  @Query((returns) => Task, {nullable: true})
  async task(@Arg("id") id: string) {
    const task = await TaskModel.findById(id);
    return task;
  }

  @Query((returns) => [Task])
  async tasks(
    @Arg("ids", (type) => [String], {nullable: true}) ids?: string[]
  ) {
    const tasks = await TaskModel.find(ids?.length ? {_id: ids} : {});
    return tasks;
  }
}

@Resolver()
export class Task_MutationResolver {
  @Mutation((returns) => Task, {nullable: true})
  async create_task(@Arg("input") input: Input_CreateTask) {
    const createValue = await TaskServices.checkAndRepairInput(null, input);
    if (!createValue) return null;

    const newTask = await TaskModel.build(createValue);
    return newTask;
  }

  @Mutation((returns) => [Task], {nullable: true})
  async update_task(@Arg("input") input: Input_UpdateTask) {
    const {id} = input;

    if (input.delete) {
      await TaskModel.findByIdAndDelete(id);
      return;
    }

    const value = deleteProps(input, "id");
    const updateValue = await TaskServices.checkAndRepairInput(id, value);
    if (!updateValue) return null;

    const task = await TaskModel.findByIdAndUpdate(id, updateValue, {
      new: true,
    });
    const newTree = await TaskServices.rebuildHierarchyTree(task);
    return newTree;
  }
}

@Resolver((of) => Task)
export class Task_FieldResolver {
  private defaultFetchCommentsByPoint: Partial<Input_FetchComments_ByPoint> = {
    length: 100000000,
    newer: false,
  };

  @FieldResolver((returns) => [TaskComment], {nullable: true})
  async comments(
    @Root() root: DocumentType<Task>,
    @Arg("input", {nullable: true})
    input?: Input_FetchComments
  ) {
    if (!input) return root.comments;

    if (input.by_ids) {
      const comments = root.comments.filter((comment) =>
        input.by_ids.includes(comment.id)
      );
      return comments;
    }

    if (input.by_point) {
      const lastIndex = root.comments.length - 1;
      const mergedDefault = {
        ...this.defaultFetchCommentsByPoint,
        ...input.by_point,
      };
      const {point, length, newer} = mergedDefault;
      let pointIndex = root.comments.findIndex(
        (comment) => comment.id === point
      );
      // the return array of comments include startIndex and endIndex comment
      let startIndex, endIndex: number;

      if (newer) {
        startIndex = Math.min(pointIndex + 1, lastIndex);
        endIndex = Math.min(lastIndex + 1, startIndex + length);
      } else {
        endIndex = pointIndex;
        startIndex = Math.max(0, endIndex - length);
      }

      const comments = root.comments.slice(startIndex, endIndex);
      return comments;
    }

    return root.comments;
  }

  @FieldResolver((returns) => TaskComment, {nullable: true})
  async create_comment(
    @Root() root: DocumentType<Task>,
    @Arg("input") input: Input_CreateComment
  ) {
    const newFiles = input?.files.length
      ? await FileModel.build(input.files)
      : [];

    const newComment = root.comments.create({
      ...input,
      task_id: root.id,
      file_ids: newFiles.map((file) => file.id),
    });
    root.comments.push(newComment);
    await root.save();

    return newComment;
  }
}
