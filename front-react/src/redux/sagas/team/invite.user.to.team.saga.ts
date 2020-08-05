import { ReduxActionType as Type } from "../../../types/redux";
import { inviteUserToJoinTeamTask } from "../../tasks/user/invite.user.to.join.team.task";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchInviteUserToTeam() {
  yield safeTakeLeading([Type.InviteUserToTeam], inviteUserToJoinTeamTask);
}
