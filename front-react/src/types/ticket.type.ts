import { TerseUser } from "./user.type";

export interface CandidateTicket {
  key: string;
  number: number;
  userId?: string;
}

export default interface Ticket {
  assignee?: TerseUser;
  creator: TerseUser;

  name: string;
}

export interface CreatedTicket extends Ticket {
  id: string;
}
