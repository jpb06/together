import { initialState } from "../../store/root.state";
import { ActionWithPayload } from "../../actions/util/generic.actions";
import {
  GET_TEAM_MEMBERS_SUCCESS,
  LOGIN_SUCCESS,
} from "../../actions/util/action.types";
import { TeamMember } from "../../../types/user.type";

const teamMembersReducer = (
  state: Array<TeamMember> | null = initialState.teamMembers,
  action: ActionWithPayload<string, Array<TeamMember>>
) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return [];
    /* --------------------------------------------------- */
    case GET_TEAM_MEMBERS_SUCCESS:
      return action.payload;
    /* --------------------------------------------------- */
    default:
      return state;
  }
};

export default teamMembersReducer;
