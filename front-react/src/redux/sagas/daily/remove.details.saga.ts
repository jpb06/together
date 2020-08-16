import { ReduxActionType as Type } from "../../../types/redux";
import { safeTakeLeadingFor } from "../../effects/safe.take.leading.helper";
import { removeDetailsTask } from "../../tasks/daily/remove.details.task";

export function* watchRemoveDetails() {
  yield safeTakeLeadingFor(
    [Type.RemoveFeeling, Type.RemoveSubject],
    removeDetailsTask
  );
}
