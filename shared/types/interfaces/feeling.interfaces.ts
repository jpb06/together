import { TerseUser } from "./user.interfaces";
import { FeelingKind } from "../enums/feeling.kind.enum";

export interface NewFeeling {
  type: FeelingKind;
  comment: string;
}

export default interface Feeling extends NewFeeling {
  creator: TerseUser;

  id: string;
}
