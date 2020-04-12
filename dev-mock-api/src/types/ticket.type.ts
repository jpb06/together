import { TerseUser } from "./persisted.user.type";

export default interface Ticket {
  id: string;
  assignee?: TerseUser;
  creator: TerseUser;

  name: string;
}
