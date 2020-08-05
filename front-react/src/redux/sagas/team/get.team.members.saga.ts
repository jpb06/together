import { ReduxActionType as Type } from "../../../types/redux";
import { getTeamMembersTask } from "../../tasks/team/get.team.members.task";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchGetTeamMembers() {
  yield safeTakeLeading([Type.TeamMembers], getTeamMembersTask);
}
