import { ReduxActionType as Type } from "../../../types/redux";
import { addFeeling } from "../../api/daily/add.feeling";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchAddFeeling() {
  yield safeTakeLeading(Type.AddFeeling, addFeeling);
}
