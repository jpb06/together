import { ReduxActionType as Type } from "../../../types/redux";
import { loginTask } from "../../tasks/user/login.api.task";
import { safeTakeLeadingFor } from "../generic/safe.take.leading.helper";

export function* watchLogin() {
  yield safeTakeLeadingFor([Type.Login], loginTask);
}
