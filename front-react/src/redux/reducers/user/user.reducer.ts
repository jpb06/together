import { initialState } from "../../store/root.state";
import { ActionWithPayload } from "../../actions/util/generic.actions";
import {
  LOGIN_SUCCESS,
  UPDATE_USER,
  CREATE_TEAM_SUCCESS_ISOLATED,
  REQUEST_TO_JOIN_TEAM_SUCCESS_ISOLATED,
} from "../../actions/util/action.types";
import User from "../../../types/user.type";
import BareTeam from "../../../types/team.type";
import { TeamJoinRequest } from "../../../types/invites.type";

const userReducer = (
  state: User | null = initialState.user,
  action:
    | ActionWithPayload<string, User>
    | ActionWithPayload<string, BareTeam>
    | ActionWithPayload<string, TeamJoinRequest>
): User | null => {
  switch (action.type) {
    /* --------------------------------------------------- */
    case LOGIN_SUCCESS:
    case UPDATE_USER:
      return action.payload as User;
    /* --------------------------------------------------- */
    case CREATE_TEAM_SUCCESS_ISOLATED:
      if (!state) return null;

      return {
        ...state,
        teams: state.teams.concat(action.payload as BareTeam),
      };
    /* --------------------------------------------------- */
    case REQUEST_TO_JOIN_TEAM_SUCCESS_ISOLATED:
      if (!state) return null;

      return {
        ...state,
        teamJoinRequests: state.teamJoinRequests.concat(
          action.payload as TeamJoinRequest
        ),
      };
    /* --------------------------------------------------- */
    default:
      return state;
  }
};

export default userReducer;
