import { ReduxActionType as Type } from "../../../types/redux";
import { createUserTask } from "../../tasks/user/create.user.task";
import { safeTakeLeadingFor } from "../generic/safe.take.leading.helper";

export function* watchCreateUser() {
  yield safeTakeLeadingFor([Type.CreateUser], createUserTask);
}
