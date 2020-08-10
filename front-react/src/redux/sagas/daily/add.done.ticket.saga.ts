import { ReduxActionType as Type } from "../../../types/redux";
import { addDoneTicketTask } from "../../tasks";
import { safeTakeLeadingFor } from "../generic/safe.take.leading.helper";

export function* watchAddDoneTicket() {
  yield safeTakeLeadingFor([Type.AddDoneTicket], addDoneTicketTask);
}
