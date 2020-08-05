import { ReduxActionType as Type } from "../../../types/redux";
import { createTeamTask } from "../../tasks/team/create.team.task";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchCreateTeam() {
  yield safeTakeLeading([Type.CreateTeam], createTeamTask);
}
