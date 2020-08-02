import { ReduxActionType as Type } from "../../../types/redux";
import { login } from "../../api/anonymous-calls/login.api";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchLogin() {
  yield safeTakeLeading(Type.Login, login);
}
