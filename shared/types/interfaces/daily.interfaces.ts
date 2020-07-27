import { Feeling } from "./feeling.interfaces";
import { Subject } from "./subject.interfaces";
import { Ticket } from "./ticket.interfaces";

export interface Daily {
  id: string;
  teamId: string;

  day: number;
  month: number;
  year: number;

  durationIndicator: string;
  unforeseenTickets: Array<Ticket>;
  doneTickets: Array<Ticket>;
  subjects: Array<Subject>;
  feelings: Array<Feeling>;
}
