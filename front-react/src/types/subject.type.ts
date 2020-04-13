import { TerseUser } from "./user.type";
import { SubjectType } from "../logic/static/static.subjects";

export interface NewSubject {
  type: SubjectType;
  description: string;
}

export default interface Subject extends NewSubject {
  creator: TerseUser;

  id: string;
}
