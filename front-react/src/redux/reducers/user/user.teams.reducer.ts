import { ActionWithPayload, ReduxActionType as Type } from "../../../types/redux";
import { TeamWithLastActivity } from "../../../types/shared";
import { isSuccess } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";

const userTeamsReducer = (
  state: Array<TeamWithLastActivity> = initialState.userTeams,
  action: ActionWithPayload<Array<TeamWithLastActivity>>
) => {
  if (isSuccess(action.type, Type.Login)) {
    return [];
  }
  if (isSuccess(action.type, Type.GetUserTeams)) {
    console.log(action);
    return action.payload;
  }

  return state;
};

export default userTeamsReducer;
