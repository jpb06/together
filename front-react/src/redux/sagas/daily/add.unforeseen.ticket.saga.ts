import { ReduxActionType as Type } from "../../../types/redux";
import { addUnforeseenTicketTask } from "../../tasks";
import { safeTakeLeadingFor } from "../generic/safe.take.leading.helper";

export function* watchAddUnforeseenTicket() {
  yield safeTakeLeadingFor([Type.AddUnforeseenTicket], addUnforeseenTicketTask);
}
