import { ReduxActionType as Type } from "../../../types/redux";
import { removeTicket } from "../../api/daily/remove.ticket";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchRemoveTicket() {
  yield safeTakeLeading(
    [Type.RemoveUnforeseenTicket, Type.RemoveDoneTicket],
    removeTicket
  );
}
