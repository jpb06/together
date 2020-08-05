import { sagaPayloadAction } from "../";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { InviteUserToJoinTeamParams } from "../../tasks";

export const inviteUserToTeamAction = (
  teamId: string,
  email: string,
  context: Context = Context.Global
) =>
  sagaPayloadAction<InviteUserToJoinTeamParams>(
    Type.InviteUserToTeam,
    context,
    { teamId, email }
  );
