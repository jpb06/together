import { ReduxActionType as Type } from "../../../types/redux";
import { safeTakeLeadingFor } from "../../effects/safe.take.leading.helper";
import { setDailyDurationTask } from "../../tasks/daily/set.daily.duration.task";

export function* watchSetDailyDuration() {
  yield safeTakeLeadingFor([Type.DailyDuration], setDailyDurationTask);
}
