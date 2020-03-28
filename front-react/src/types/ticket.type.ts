import { TerseUser } from "./user.type";

export default interface Ticket {
  assignee?: TerseUser;
  creator: TerseUser;

  name: string;
}
