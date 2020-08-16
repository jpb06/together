import { ReduxActionType as Type } from "../../../types/redux";
import { safeTakeLeadingFor } from "../../effects/safe.take.leading.helper";
import { loginTask } from "../../tasks/user/login.task";

export function* watchLogin() {
  yield safeTakeLeadingFor([Type.Login], loginTask);
}
