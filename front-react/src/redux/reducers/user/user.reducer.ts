import { ActionWithPayload, ReduxActionType as Type } from "../../../types/redux";
import { BareTeam, TeamJoinRequest, User } from "../../../types/shared";
import { isSuccess } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";

const userReducer = (
  state: User | null = initialState.user,
  action:
    | ActionWithPayload<User>
    | ActionWithPayload<BareTeam>
    | ActionWithPayload<TeamJoinRequest>
): User | null => {
  if (isSuccess(action.type, Type.Login)) {
    return action.payload as User;
  }

  if (isSuccess(action.type, Type.CreateTeam)) {
    if (!state) return null;

    return {
      ...state,
      teams: state.teams.concat(action.payload as BareTeam),
    };
  }

  if (isSuccess(action.type, Type.RequestToJoinTeam)) {
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
