import { TeamWithLastActivity } from "../../../../../shared/types";
import {
    ActionWithPayload, ReduxActionModifiers as Modifier, ReduxActionType as Type
} from "../../../types/redux";
import { isSuccess } from "../../actions/generic/action.checks";
import { initialState } from "../../store/root.state";

const userTeamsReducer = (
  state: Array<TeamWithLastActivity> = initialState.userTeams,
  action: ActionWithPayload<Array<TeamWithLastActivity>>
) => {
  if (isSuccess(action.type, Type.Login)) {
    return [];
  }
  if (isSuccess(action.type, Type.GetUserTeams)) {
    return action.payload;
  }

  return state;
};

export default userTeamsReducer;
