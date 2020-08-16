import { ReduxActionType as Type } from "../../../types/redux";
import { safeTakeLeadingFor } from "../../effects/safe.take.leading.helper";
import { addUnforeseenTicketTask } from "../../tasks";

export function* watchAddUnforeseenTicket() {
  yield safeTakeLeadingFor([Type.AddUnforeseenTicket], addUnforeseenTicketTask);
}
