import { ReduxActionType as Type } from "../../../types/redux";
import { safeTakeLeadingFor } from "../../effects/safe.take.leading.helper";
import { getTimelineTask } from "../../tasks/user/get.timeline.task";

export function* watchGetTimeline() {
  yield safeTakeLeadingFor([Type.GetTimeline], getTimelineTask);
}
