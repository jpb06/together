import { ReduxActionType as Type } from "../../../types/redux";
import { getUserTeamsTask } from "../../tasks/user/get.user.teams.task";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchGetUserTeams() {
  yield safeTakeLeading([Type.GetUserTeams], getUserTeamsTask);
}
