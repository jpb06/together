import { ReduxActionType as Type } from "../../../types/redux";
import { removeDetailsTask } from "../../tasks/daily/remove.details.task";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchRemoveDetails() {
  yield safeTakeLeading(
    [Type.RemoveFeeling, Type.RemoveSubject],
    removeDetailsTask
  );
}
