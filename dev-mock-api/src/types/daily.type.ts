import Ticket from "./ticket.type";
import Subject from "./subject.type";
import Feeling from "./feeling.type";

export default interface Daily {
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
