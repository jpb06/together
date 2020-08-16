import { ReduxActionType as Type } from "../../../types/redux";
import { safeTakeLeadingFor } from "../../effects/safe.take.leading.helper";
import { removeTicketTask } from "../../tasks/daily/remove.ticket.task";

export function* watchRemoveTicket() {
  yield safeTakeLeadingFor(
    [Type.RemoveUnforeseenTicket, Type.RemoveDoneTicket],
    removeTicketTask
  );
}
