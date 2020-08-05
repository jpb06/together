import { History, LocationState } from "history";

import { sagaPayloadAction } from "../";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { RequestToJoinTeamParams } from "../../tasks";

export const requestToJoinTeamAction = (
  teamName: string,
  history: History<LocationState>,
  context: Context = Context.Global
) =>
  sagaPayloadAction<RequestToJoinTeamParams>(Type.RequestToJoinTeam, context, {
    teamName,
    history,
  });
