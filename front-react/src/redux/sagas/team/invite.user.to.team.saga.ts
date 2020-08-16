import { ReduxActionType as Type } from "../../../types/redux";
import { safeTakeLeadingFor } from "../../effects/safe.take.leading.helper";
import { inviteUserToJoinTeamTask } from "../../tasks/user/invite.user.to.join.team.task";

export function* watchInviteUserToTeam() {
  yield safeTakeLeadingFor([Type.InviteUserToTeam], inviteUserToJoinTeamTask);
}
