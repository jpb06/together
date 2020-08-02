import { ReduxActionType as Type } from "../../../types/redux";
import { getDaily } from "../../api/daily/get.daily";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchGetDaily() {
  yield safeTakeLeading(Type.GetDaily, getDaily);
}
