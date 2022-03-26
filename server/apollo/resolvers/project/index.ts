import {ProjectModel, SectionModel} from "@models";
import {Project} from "@models/project";
import {Section} from "@models/section";
import {DocumentType} from "@typegoose/typegoose";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import {
  Input_CreateProject,
  Input_CreateSection,
  Input_UpdateProject,
  Input_UpdateSection,
} from "./input";
import {deleteProps} from "@utils/x";

@Resolver()
export class Project_QueryResolver {
  @Query((returns) => Project, {nullable: true})
  async project(@Arg("id") id: string) {
    const project = await ProjectModel.findById(id);
    return project;
  }

  @Query((returns) => [Project])
  async projects(
    @Arg("ids", (type) => [String], {nullable: true}) ids?: string[]
  ) {
    const projects = await ProjectModel.find(ids?.length ? {id: ids} : {});
    return projects;
  }
}

@Resolver()
export class Project_MutationResolver {
  @Mutation((returns) => Project, {nullable: true})
  async create_project(@Arg("input") input: Input_CreateProject) {
    const newProject = await ProjectModel.build(input);
    return newProject;
  }

  @Mutation((returns) => Project)
  async update_project(@Arg("input") input: Input_UpdateProject) {
    const {id} = input;
    if (input.delete) {
      await ProjectModel.findByIdAndDelete(id);
      return;
    }

    const updateValue = deleteProps(input, "id");
    const project = await ProjectModel.findByIdAndUpdate(id, updateValue, {
      new: true,
    });
    return project;
  }
}

@Resolver((of) => Project)
export class Project_FieldResolver {
  @FieldResolver((returns) => Section)
  async create_section(
    @Root() root: DocumentType<Project>,
    @Arg("input") input: Input_CreateSection
  ) {
    const newSection = root.sections.create(input);
    await root.sections.push(newSection);
    return newSection;
  }

  @FieldResolver((returns) => Section)
  async update_sections(
    @Root() root: DocumentType<Project>,
    @Arg("input", (type) => [Input_UpdateSection]) input: Input_UpdateSection[]
  ) {
    input.forEach((sectionUpdate) => {
      const {id} = sectionUpdate;

      if (sectionUpdate.delete) {
        root.sections.id(id).remove();
        return;
      }

      const section = root.sections.id(id);
      const updateValue = deleteProps(sectionUpdate, "id");
      section.set(updateValue);
      return section;
    });

    await root.save();
    return root.sections;
  }
}
