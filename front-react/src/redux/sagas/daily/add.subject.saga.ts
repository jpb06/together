import { ReduxActionType as Type } from "../../../types/redux";
import { addSubjectTask } from "../../tasks";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchAddSubject() {
  yield safeTakeLeading([Type.AddSubject], addSubjectTask);
}
