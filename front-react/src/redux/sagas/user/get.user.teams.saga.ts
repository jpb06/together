import { ReduxActionType as Type } from "../../../types/redux";
import { safeTakeLeadingFor } from "../../effects/safe.take.leading.helper";
import { getUserTeamsTask } from "../../tasks/user/get.user.teams.task";

export function* watchGetUserTeams() {
  yield safeTakeLeadingFor([Type.GetUserTeams], getUserTeamsTask);
}
