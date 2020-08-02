import { ReduxActionType as Type } from "../../../types/redux";
import { createUser } from "../../api/anonymous-calls/create.user.api";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchCreateUser() {
  yield safeTakeLeading(Type.CreateUser, createUser);
}
