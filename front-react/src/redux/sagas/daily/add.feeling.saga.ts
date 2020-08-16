import { ReduxActionType as Type } from "../../../types/redux";
import { safeTakeLeadingFor } from "../../effects/safe.take.leading.helper";
import { addFeelingTask } from "../../tasks";

export function* watchAddFeeling() {
  yield safeTakeLeadingFor([Type.AddFeeling], addFeelingTask);
}
