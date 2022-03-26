import {SectionModel} from "@models";
import {Section} from "@models/section";
import {Arg, Mutation, Query, Resolver} from "type-graphql";

@Resolver()
export class Section_QueryResolver {}

@Resolver()
export class Section_MutationResolver {}

@Resolver((of) => Section)
export class Section_FieldResolver {}
