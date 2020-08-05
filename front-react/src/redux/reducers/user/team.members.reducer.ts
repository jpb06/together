import { ActionWithPayload, ReduxActionType as Type } from "../../../types/redux";
import { TeamMember } from "../../../types/shared";
import { isSuccess } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";

const teamMembersReducer = (
  state: Array<TeamMember> | null = initialState.teamMembers,
  action: ActionWithPayload<Array<TeamMember>>
) => {
  if (isSuccess(action.type, Type.Login)) {
    return [];
  }

  if (isSuccess(action.type, Type.GetUserTeams)) {
    return action.payload;
  }

  return state;
};

export default teamMembersReducer;
