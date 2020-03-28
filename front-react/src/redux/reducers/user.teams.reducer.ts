import { initialState } from "../store/root.state";
import { ActionWithPayload } from "../actions/util/generic.actions";
import { GET_USER_TEAMS_SUCCESS } from "../actions/util/action.types";
import { TeamWithLastActivity } from "../../types/team.type";

const userTeamsReducer = (
  state: Array<TeamWithLastActivity> = initialState.userTeams,
  action: ActionWithPayload<string, Array<TeamWithLastActivity>>
) => {
  switch (action.type) {
    /* --------------------------------------------------- */
    case GET_USER_TEAMS_SUCCESS:
      return action.payload;
    /* --------------------------------------------------- */
    default:
      return state;
  }
};

export { userTeamsReducer };
