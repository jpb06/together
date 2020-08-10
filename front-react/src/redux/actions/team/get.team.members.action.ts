import { sagaPayloadAction } from "../";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";

export const getTeamMembersAction = (
  teamId: string,
  context: Context = Context.Global
) => sagaPayloadAction<string>(Type.TeamMembers, context, teamId);
