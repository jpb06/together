import { TerseUser } from "./user.type";
import { SubjectType } from "../logic/static/static.subjects";

export default interface Subject {
  creator: TerseUser;

  id: string;
  type: SubjectType;
  description: string;
}
