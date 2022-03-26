import {modelOptions, prop} from "@typegoose/typegoose";
import {Field, ObjectType} from "type-graphql";
import {ScheduleStates} from "server/types/enum";

@ObjectType()
@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class Schedule {
  @Field((type) => Date)
  @prop({type: Date, default: () => new Date()})
  date_start?: Date;

  @Field((type) => Date, {nullable: true})
  @prop({type: Date, default: null})
  date_end?: Date;

  @Field((type) => ScheduleStates)
  @prop({type: String, enum: ScheduleStates, default: ScheduleStates.TODO})
  state?: ScheduleStates;
}
