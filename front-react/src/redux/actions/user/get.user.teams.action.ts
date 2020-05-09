import { UPDATE_USER, Context, Type, Result } from "../../types/action.types";
import { Dispatch } from "react";
import * as TogetherApi from "../../../api/user/get.user.teams";
import { Action } from "redux";
import { action } from "../global/generic.actions";
import { ApiStatus } from "../../../api/setup/together.api";
import { TeamWithLastActivity } from "../../../types/team.type";
import * as localStorage from "local-storage";
import LocalStorageKeys from "../../../logic/local.storage.keys";
import User from "../../../types/user.type";
import { teamsDoMatch } from "../../../logic/team.util";
import { ActionResult } from "../../types/action.result";
import { ThunkResult } from "../../types/thunk.result";
import beginApiCallAction from "../global/begin.api.call.action";
import { typeFor } from "../../logic/action-types/redux.action.type.generation";

const type = Type.getUserTeams;

interface UserTeamsActionResult extends ActionResult {
  message?: string;
  userHasSeveralTeams?: boolean;
}

const getUserTeamsAction = (
  userId: string,
  fetchLastActivity: boolean,
  context: Context
): ThunkResult<Promise<UserTeamsActionResult>> => async (
  dispatch: Dispatch<Action>
) => {
  dispatch(beginApiCallAction(context));

  const result = await TogetherApi.getUserTeams(userId, fetchLastActivity);
  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(action(typeFor(type, context, Result.Failure), result.error));
    return { success: false, message: result.error?.message };
  }

  const teams = result.data as Array<TeamWithLastActivity>;

  const user = localStorage.get<User>(LocalStorageKeys.user);
  user.teams = teams.map((team) => ({ id: team.id, name: team.name }));
  localStorage.set(LocalStorageKeys.user, user);

  if (!teamsDoMatch(user.teams, teams)) dispatch(action(UPDATE_USER, user));

  dispatch(action(typeFor(type, context, Result.Success), teams));
  return { success: true, userHasSeveralTeams: teams.length > 1 };
};

export default getUserTeamsAction;
