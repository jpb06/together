import { ReduxActionType as Type } from "../../../types/redux";
import { setDailyDuration } from "../../api/daily/set.daily.duration";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchSetDailyDuration() {
  yield safeTakeLeading(Type.DailyDuration, setDailyDuration);
}
