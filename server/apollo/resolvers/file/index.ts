import {FileModel} from "@models";
import {File} from "@models/file";
import {deleteProps} from "@utils/x";
import {Arg, Mutation, Query, Resolver, Ctx} from "type-graphql";
import {Input_UpdateFile} from "./input";

@Resolver()
export class File_QueryResolver {
  @Query((returns) => File, {nullable: true})
  async file(@Arg("id") id: string) {
    const file = await FileModel.findById(id);
    return file;
  }

  @Query((returns) => [File])
  async files(
    @Arg("ids", (type) => [String], {nullable: true}) ids?: string[]
  ) {
    const files = await FileModel.find(ids?.length ? {id: ids} : {});
    return files;
  }
}

@Resolver()
export class File_MutationResolver {
  @Mutation((returns) => File)
  async update_files(
    @Arg("input", (type) => [Input_UpdateFile]) input: Input_UpdateFile[]
  ) {
    const files = await Promise.all(
      input.map((fileUpdate) => {
        const {id} = fileUpdate;
        if (fileUpdate.delete) return FileModel.findByIdAndDelete(id).exec();

        const updateValue = deleteProps(fileUpdate, "id");
        return FileModel.findByIdAndUpdate(id, updateValue, {new: true}).exec();
      })
    );
    return files;
  }
}

@Resolver((of) => File)
export class File_FieldResolver {}
