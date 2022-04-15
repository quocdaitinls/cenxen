import {Section} from "@db/object";
import {Resolver} from "type-graphql";

@Resolver()
export class Section_QueryResolver {}

@Resolver()
export class Section_MutationResolver {}

@Resolver((of) => Section)
export class Section_FieldResolver {}
