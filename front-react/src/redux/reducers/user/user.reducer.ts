import { initialState } from "../../store/root.state";
import User from "../../../types/user.type";
import BareTeam from "../../../types/team.type";
import { TeamJoinRequest } from "../../../types/invites.type";
import { ActionWithPayload } from "../../types/action.payloads";
import { Type, Context, Result, UPDATE_USER } from "../../types/action.types";
import { typeFor } from "../../logic/action-types/redux.action.type.generation";

const userReducer = (
  state: User | null = initialState.user,
  action:
    | ActionWithPayload<string, User>
    | ActionWithPayload<string, BareTeam>
    | ActionWithPayload<string, TeamJoinRequest>
): User | null => {
  switch (action.type) {
    /* --------------------------------------------------- */
    case typeFor(Type.login, Context.Global, Result.Success):
    case UPDATE_USER:
      return action.payload as User;
    /* --------------------------------------------------- */
    case typeFor(Type.createTeam, Context.AccountCreation, Result.Success):
      if (!state) return null;

      return {
        ...state,
        teams: state.teams.concat(action.payload as BareTeam),
      };
    /* --------------------------------------------------- */
    case typeFor(
      Type.requestToJoinTeam,
      Context.AccountCreation,
      Result.Success
    ):
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
