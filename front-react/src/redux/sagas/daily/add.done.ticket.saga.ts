import { ReduxActionType as Type } from "../../../types/redux";
import { safeTakeLeadingFor } from "../../effects/safe.take.leading.helper";
import { addDoneTicketTask } from "../../tasks";

export function* watchAddDoneTicket() {
  yield safeTakeLeadingFor([Type.AddDoneTicket], addDoneTicketTask);
}
