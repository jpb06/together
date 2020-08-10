import { ReduxActionType as Type } from "../../../types/redux";
import { removeDetailsTask } from "../../tasks/daily/remove.details.task";
import { safeTakeLeadingFor } from "../generic/safe.take.leading.helper";

export function* watchRemoveDetails() {
  yield safeTakeLeadingFor(
    [Type.RemoveFeeling, Type.RemoveSubject],
    removeDetailsTask
  );
}
