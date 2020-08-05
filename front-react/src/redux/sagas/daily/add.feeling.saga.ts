import { ReduxActionType as Type } from "../../../types/redux";
import { addFeelingTask } from "../../tasks";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchAddFeeling() {
  yield safeTakeLeading([Type.AddFeeling], addFeelingTask);
}
