import { ReduxActionType as Type } from "../../../types/redux";
import { addSubjectTask } from "../../tasks";
import { safeTakeLeadingFor } from "../generic/safe.take.leading.helper";

export function* watchAddSubject() {
  yield safeTakeLeadingFor([Type.AddSubject], addSubjectTask);
}
