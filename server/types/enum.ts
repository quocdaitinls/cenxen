import {registerEnumType} from "type-graphql";

export enum Emotions {
  LIKE = "em_like",
  LOVE = "em_love",
  HAHA = "em_haha",
  WOW = "em_wow",
  SAD = "em_sad",
  ANGRY = "em_angry",
}

export enum Piorities {
  HIGHEST = "pi_highest",
  HIGH = "pi_high",
  MEDIUM = "pi_medium",
  LOW = "pi_low",
  LOWEST = "pi_lowest",
}
registerEnumType(Piorities, {name: "Piorities"});

export enum ScheduleStates {
  TODO = "ss_todo",
  INPROGRESS = "ss_inprogress",
  DONE = "ss_done",
  EXPIRED = "ss_expired",
}
registerEnumType(ScheduleStates, {name: "ScheduleStates"});

export enum ContentTypes {
  REGULAR = "content_regular",
  FILE = "content_file",
  VOTE = "content_vote",
  REMINDER = "content_reminder",
}
registerEnumType(ContentTypes, {name: "ContentTypes"});

export enum FileTypes {
  IMAGE = "ft_image",
  VIDEO = "ft_video",
  FILE = "ft_file",
}
