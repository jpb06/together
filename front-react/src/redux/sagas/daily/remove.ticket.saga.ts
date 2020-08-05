import { ReduxActionType as Type } from "../../../types/redux";
import { removeTicketTask } from "../../tasks/daily/remove.ticket.task";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchRemoveTicket() {
  yield safeTakeLeading(
    [Type.RemoveUnforeseenTicket, Type.RemoveDoneTicket],
    removeTicketTask
  );
}
