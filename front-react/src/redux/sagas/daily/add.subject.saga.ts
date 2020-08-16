import { ReduxActionType as Type } from "../../../types/redux";
import { safeTakeLeadingFor } from "../../effects/safe.take.leading.helper";
import { addSubjectTask } from "../../tasks";

export function* watchAddSubject() {
  yield safeTakeLeadingFor([Type.AddSubject], addSubjectTask);
}
