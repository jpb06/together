import { ReduxActionType as Type } from "../../../types/redux";
import { addSubject } from "../../api/daily/add.subject";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchAddSubject() {
  yield safeTakeLeading(Type.AddSubject, addSubject);
}
