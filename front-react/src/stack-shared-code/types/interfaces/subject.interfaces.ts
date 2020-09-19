import { SubjectKind } from "../enums/subject.kind.enum";
import { TerseUser } from "./user.interfaces";

export interface NewSubject {
  type: SubjectKind;
  description: string;
}

export interface Subject extends NewSubject {
  creator: TerseUser;

  id: string;
}
