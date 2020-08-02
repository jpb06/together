import { ReduxActionType as Type } from "../../../types/redux";
import { removeDetails } from "../../api/daily/remove.details";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchRemoveDetails() {
  yield safeTakeLeading(
    [Type.RemoveFeeling, Type.RemoveSubject],
    removeDetails
  );
}
