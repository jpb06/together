import { TerseUser } from "./persisted.user.type";

export enum FeelingType {
  ThumbsUp = 1,
  ThumbDown = 2,
  Satisfaction = 3,
  DyingInside = 4
}

export default interface Feeling {
  creator: TerseUser;

  id: string;
  type: FeelingType;
  comment: string;
}
