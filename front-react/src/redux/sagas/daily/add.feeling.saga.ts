import { ReduxActionType as Type } from "../../../types/redux";
import { addFeelingTask } from "../../tasks";
import { safeTakeLeadingFor } from "../generic/safe.take.leading.helper";

export function* watchAddFeeling() {
  yield safeTakeLeadingFor([Type.AddFeeling], addFeelingTask);
}
