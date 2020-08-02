import { ReduxActionType as Type } from "../../../types/redux";
import { addDoneTicket } from "../../api/daily/add.done.ticket";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchAddDoneTicket() {
  yield safeTakeLeading(Type.AddDoneTicket, addDoneTicket);
}
