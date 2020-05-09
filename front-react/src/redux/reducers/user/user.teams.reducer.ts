import { initialState } from "../../store/root.state";
import { TeamWithLastActivity } from "../../../types/team.type";
import { ActionWithPayload } from "../../types/action.payloads";
import { Type, Context, Result } from "../../types/action.types";
import { typeFor } from "../../logic/action-types/redux.action.type.generation";

const userTeamsReducer = (
  state: Array<TeamWithLastActivity> = initialState.userTeams,
  action: ActionWithPayload<string, Array<TeamWithLastActivity>>
) => {
  switch (action.type) {
    case typeFor(Type.login, Context.Global, Result.Success):
      return [];
    /* --------------------------------------------------- */
    case typeFor(Type.getUserTeams, Context.Global, Result.Success):
      return action.payload;
    /* --------------------------------------------------- */
    default:
      return state;
  }
};

export default userTeamsReducer;
