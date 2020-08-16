import { ReduxActionType as Type } from "../../../types/redux";
import { safeTakeLeadingFor } from "../../effects/safe.take.leading.helper";
import { createTeamTask } from "../../tasks/team/create.team.task";

export function* watchCreateTeam() {
  yield safeTakeLeadingFor([Type.CreateTeam], createTeamTask);
}
