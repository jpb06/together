import { ReduxActionType as Type } from "../../../types/redux";
import { getUserTeams } from "../../api/user/get.user.teams";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchGetUserTeams() {
  yield safeTakeLeading(Type.GetUserTeams, getUserTeams);
}
