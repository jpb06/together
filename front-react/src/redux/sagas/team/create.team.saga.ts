import { ReduxActionType as Type } from "../../../types/redux";
import { createTeamTask } from "../../tasks/team/create.team.task";
import { safeTakeLeadingFor } from "../generic/safe.take.leading.helper";

export function* watchCreateTeam() {
  yield safeTakeLeadingFor([Type.CreateTeam], createTeamTask);
}
