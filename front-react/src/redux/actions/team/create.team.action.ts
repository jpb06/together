import { sagaPayloadAction } from "../";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";

export const createTeamAction = (
  name: string,
  context: Context = Context.Global
) => sagaPayloadAction<string>(Type.CreateTeam, context, name);
