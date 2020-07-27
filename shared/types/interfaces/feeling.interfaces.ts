import { FeelingKind } from "../enums/feeling.kind.enum";
import { TerseUser } from "./user.interfaces";

export interface NewFeeling {
  type: FeelingKind;
  comment: string;
}

export interface Feeling extends NewFeeling {
  creator: TerseUser;

  id: string;
}
