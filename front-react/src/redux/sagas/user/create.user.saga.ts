import { ReduxActionType as Type } from "../../../types/redux";
import { createUserTask } from "../../tasks/user/create.user.task";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchCreateUser() {
  yield safeTakeLeading([Type.CreateUser], createUserTask);
}
