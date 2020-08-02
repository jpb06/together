import { ReduxActionType as Type } from "../../../types/redux";
import { createTeam } from "../../api/team/create.team.api";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchCreateTeam() {
  yield safeTakeLeading(Type.CreateTeam, createTeam);
}
