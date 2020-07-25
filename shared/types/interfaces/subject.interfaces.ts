import { TerseUser } from "./user.interfaces";
import { SubjectKind } from "../enums/subject.kind.enum";

export interface NewSubject {
  type: SubjectKind;
  description: string;
}

export default interface Subject extends NewSubject {
  creator: TerseUser;

  id: string;
}
