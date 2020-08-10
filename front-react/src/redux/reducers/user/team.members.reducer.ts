import { ActionWithPayload, ReduxActionType as Type } from "../../../types/redux";
import { TeamMember } from "../../../types/shared";
import { isSuccessFor } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";

const teamMembersReducer = (
  state: Array<TeamMember> | null = initialState.teamMembers,
  action: ActionWithPayload<Array<TeamMember>>
) => {
  if (isSuccessFor(Type.Login, action.type)) {
    return [];
  }

  if (isSuccessFor(Type.TeamMembers, action.type)) {
    return action.payload;
  }

  return state;
};

export default teamMembersReducer;
