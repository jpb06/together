import { ReduxActionType as Type } from "../../../types/redux";
import { getTimelineTask } from "../../tasks/user/get.timeline.task";
import { safeTakeLeadingFor } from "../generic/safe.take.leading.helper";

export function* watchGetTimeline() {
  yield safeTakeLeadingFor([Type.GetTimeline], getTimelineTask);
}
