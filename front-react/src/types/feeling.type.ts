import { TerseUser } from "./user.type";
import { FeelingType } from "../logic/static/static.feelings";

export interface NewFeeling {
  type: FeelingType;
  comment: string;
}

export default interface Feeling extends NewFeeling {
  creator: TerseUser;

  id: string;
}
