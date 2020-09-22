import { BareTeam, TeamJoinRequest, User } from "../../../stack-shared-code/types";
import { ActionWithPayload, ReduxActionType as Type } from "../../../types/redux";
import { isSuccessFor } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";

const userReducer = (
  state: User | null = initialState.user,
  action: ActionWithPayload<any>
): User | null => {
  if (isSuccessFor(Type.Login, action.type)) {
    return action.payload as User;
  }

  if (isSuccessFor(Type.CreateTeam, action.type)) {
    if (!state) return null;

    return {
      ...state,
      teams: state.teams.concat(action.payload as BareTeam),
    };
  }

  if (isSuccessFor(Type.RequestToJoinTeam, action.type)) {
    if (!state) return null;

    return {
      ...state,
      teamJoinRequests: state.teamJoinRequests.concat(
        action.payload as TeamJoinRequest
      ),
    };
  }

  return state;
};

export default userReducer;
