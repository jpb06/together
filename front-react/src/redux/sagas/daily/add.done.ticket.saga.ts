import { ReduxActionType as Type } from "../../../types/redux";
import { addDoneTicketTask } from "../../tasks";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchAddDoneTicket() {
  yield safeTakeLeading([Type.AddDoneTicket], addDoneTicketTask);
}
