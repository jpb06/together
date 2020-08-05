import { ReduxActionType as Type } from "../../../types/redux";
import { getTimelineTask } from "../../tasks/user/get.timeline.task";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchGetTimeline() {
  yield safeTakeLeading([Type.GetTimeline], getTimelineTask);
}
