import { ReduxActionType as Type } from "../../../types/redux";
import { safeTakeLeadingFor } from "../../effects/safe.take.leading.helper";
import { createUserTask } from "../../tasks/user/create.user.task";

export function* watchCreateUser() {
  yield safeTakeLeadingFor([Type.CreateUser], createUserTask);
}
