import { ReduxActionType as Type } from "../../../types/redux";
import { setDailyDurationTask } from "../../tasks/daily/set.daily.duration.task";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchSetDailyDuration() {
  yield safeTakeLeading([Type.DailyDuration], setDailyDurationTask);
}
