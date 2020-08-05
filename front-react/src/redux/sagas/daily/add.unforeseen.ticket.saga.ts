import { ReduxActionType as Type } from "../../../types/redux";
import { addUnforeseenTicketTask } from "../../tasks";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchAddUnforeseenTicket() {
  yield safeTakeLeading([Type.AddUnforeseenTicket], addUnforeseenTicketTask);
}
