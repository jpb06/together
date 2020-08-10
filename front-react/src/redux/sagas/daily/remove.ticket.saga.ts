import { ReduxActionType as Type } from "../../../types/redux";
import { removeTicketTask } from "../../tasks/daily/remove.ticket.task";
import { safeTakeLeadingFor } from "../generic/safe.take.leading.helper";

export function* watchRemoveTicket() {
  yield safeTakeLeadingFor(
    [Type.RemoveUnforeseenTicket, Type.RemoveDoneTicket],
    removeTicketTask
  );
}
