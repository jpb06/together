import {
  GET_USER_TEAMS_SUCCESS,
  GET_USER_TEAMS_FAILURE,
  ThunkResult,
  ActionResult,
  UPDATE_USER
} from "../util/action.types";
import { Dispatch } from "react";
import * as TogetherApi from "../../../api/user/get.user.teams";
import { Action } from "redux";
import beginApiCallAction from "../begin.api.call.action";
import { action } from "../util/generic.actions";
import { ApiStatus } from "../../../api/setup/together.api";
import { TeamWithLastActivity } from "../../../types/team.type";
import * as localStorage from "local-storage";
import LocalStorageKeys from "../../../logic/local.storage.keys";
import User from "../../../types/user.type";
import { teamsDoMatch } from "../../../logic/team.util";

interface UserTeamsActionResult extends ActionResult {
  message?: string;
  userHasSeveralTeams?: boolean;
}

const getUserTeamsAction = (
  userId: string,
  fetchLastActivity: boolean
): ThunkResult<Promise<UserTeamsActionResult>> => async (
  dispatch: Dispatch<Action>
) => {
  dispatch(beginApiCallAction());

  const result = await TogetherApi.getUserTeams(userId, fetchLastActivity);
  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(action(GET_USER_TEAMS_FAILURE, result.error));
    return { success: false, message: result.error };
  }

  const teams = result.data as Array<TeamWithLastActivity>;

  const user = localStorage.get<User>(LocalStorageKeys.user);
  user.teams = teams.map(team => ({ id: team.id, name: team.name }));
  localStorage.set(LocalStorageKeys.user, user);

  if (!teamsDoMatch(user.teams, teams)) dispatch(action(UPDATE_USER, user));
  dispatch(action(GET_USER_TEAMS_SUCCESS, teams));
  return { success: true, userHasSeveralTeams: teams.length > 1 };
};

export default getUserTeamsAction;
