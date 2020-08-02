import { ReduxActionType as Type } from "../../../types/redux";
import { getTimeline } from "../../api/user/get.timeline";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchGetTimeline() {
  yield safeTakeLeading(Type.GetTimeline, getTimeline);
}
