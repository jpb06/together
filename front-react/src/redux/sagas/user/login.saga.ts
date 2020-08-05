import { ReduxActionType as Type } from "../../../types/redux";
import { loginTask } from "../../tasks/user/login.api.task";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchLogin() {
  yield safeTakeLeading([Type.Login], loginTask);
}
