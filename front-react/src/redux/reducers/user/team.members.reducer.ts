import { initialState } from "../../store/root.state";
import { TeamMember } from "../../../types/user.type";
import { Type, Context, Result } from "../../types/action.types";
import { ActionWithPayload } from "../../types/action.payloads";
import { typeFor } from "../../logic/action-types/redux.action.type.generation";

const teamMembersReducer = (
  state: Array<TeamMember> | null = initialState.teamMembers,
  action: ActionWithPayload<string, Array<TeamMember>>
) => {
  switch (action.type) {
    case typeFor(Type.login, Context.Global, Result.Success):
      return [];
    /* --------------------------------------------------- */
    case typeFor(Type.getTeamMembers, Context.Global, Result.Success):
      return action.payload;
    /* --------------------------------------------------- */
    default:
      return state;
  }
};

export default teamMembersReducer;
