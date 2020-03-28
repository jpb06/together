import { TerseUser } from "./persisted.user.type";

export enum SubjectType {
  Drive = 1,
  Restraint = 2,
  Risk = 3,
  Team = 4,
  Goal = 5
}

export default interface Subject {
  creator: TerseUser;

  id: string;
  type: SubjectType;
  description: string;
}
