import { ActionWithPayload, ReduxActionType as Type } from "../../../types/redux";
import { TeamWithLastActivity } from "../../../types/shared";
import { isSuccessFor } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";

const userTeamsReducer = (
  state: Array<TeamWithLastActivity> = initialState.userTeams,
  action: ActionWithPayload<Array<TeamWithLastActivity>>
) => {
  if (isSuccessFor(Type.Login, action.type)) {
    return [];
  }
  if (isSuccessFor(Type.GetUserTeams, action.type)) {
    return action.payload;
  }

  return state;
};

export default userTeamsReducer;
