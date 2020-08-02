import { ReduxActionType as Type } from "../../../types/redux";
import { addUnforeseenTicket } from "../../api/daily/add.unforeseen.ticket";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchAddUnforeseenTicket() {
  yield safeTakeLeading(Type.AddUnforeseenTicket, addUnforeseenTicket);
}
