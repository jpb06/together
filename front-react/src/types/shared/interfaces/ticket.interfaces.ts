import { TerseUser } from "./user.interfaces";

export interface CandidateTicket {
  key: string;
  number: number;
  userId?: string;
}

export interface NewTicket {
  assignee?: TerseUser;
  creator: TerseUser;

  name: string;
}

export interface Ticket extends NewTicket {
  id: string;
}
