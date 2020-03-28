import { TerseUser } from "./user.type";
import { FeelingType } from "../logic/static/static.feelings";

export default interface Feeling {
  creator: TerseUser;

  id: string;
  type: FeelingType;
  comment: string;
}
