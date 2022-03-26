import {Schedule} from "@models/lib/schedule";
import {Field, InputType} from "type-graphql";
import {ScheduleStates} from "server/types/enum";

@InputType()
export class Input_Schedule implements Partial<Schedule> {
  @Field((type) => Date, {nullable: true})
  date_start?: Date;

  @Field((type) => Date, {nullable: true})
  date_end?: Date;

  @Field((type) => ScheduleStates, {nullable: true})
  state?: ScheduleStates;
}
