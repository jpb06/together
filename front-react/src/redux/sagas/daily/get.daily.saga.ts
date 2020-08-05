import { ReduxActionType as Type } from "../../../types/redux";
import { getDailyTask } from "../../tasks";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchGetDaily() {
  yield safeTakeLeading([Type.GetDaily], getDailyTask);
}
