import { sagaPayloadAction } from "../";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { GetUserTeamsParams } from "../../tasks";

export const getUserTeamsAction = (
  userId: string,
  fetchLastActivity: boolean,
  context: Context = Context.Global
) =>
  sagaPayloadAction<GetUserTeamsParams>(Type.GetUserTeams, context, {
    userId,
    fetchLastActivity,
  });
