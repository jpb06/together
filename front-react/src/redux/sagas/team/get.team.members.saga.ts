import { ReduxActionType as Type } from "../../../types/redux";
import { getTeamMembers } from "../../api/team/get.team.members";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchGetTeamMembers() {
  yield safeTakeLeading(Type.TeamMembers, getTeamMembers);
}
