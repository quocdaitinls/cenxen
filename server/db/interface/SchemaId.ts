import {Field, ID, InterfaceType} from "type-graphql";

@InterfaceType()
export class SchemaId {
  @Field((type) => ID)
  id: string;
}
