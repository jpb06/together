import { ReduxActionType as Type } from "../../../types/redux";
import { getUserTeamsTask } from "../../tasks/user/get.user.teams.task";
import { safeTakeLeadingFor } from "../generic/safe.take.leading.helper";

export function* watchGetUserTeams() {
  yield safeTakeLeadingFor([Type.GetUserTeams], getUserTeamsTask);
}
