import { ReduxActionType as Type } from "../../../types/redux";
import { inviteUserToTeam } from "../../api/user/invite.user.to.join.team";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchInviteUserToTeam() {
  yield safeTakeLeading(Type.InviteUserToTeam, inviteUserToTeam);
}
