import {
  ThunkResult,
  ActionResult,
  GET_TEAM_MEMBERS_SUCCESS,
  GET_TEAM_MEMBERS_FAILURE,
} from "../util/action.types";
import { Dispatch } from "react";
import { Action } from "redux";
import beginApiCallAction from "../begin.api.call.action";
import * as TogetherApi from "../../../api/team/get.team.members";
import { ApiStatus } from "../../../api/setup/together.api";
import { action } from "../util/generic.actions";
import { TeamMember } from "../../../types/user.type";

const getTeamMembersAction = (
  teamId: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(beginApiCallAction());

  const result = await TogetherApi.getTeamMembers(teamId);
  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(action(GET_TEAM_MEMBERS_FAILURE, result.error));
    return { success: false, message: result.error };
  }

  const teamMembers = result.data as Array<TeamMember>;

  dispatch(action(GET_TEAM_MEMBERS_SUCCESS, teamMembers));
  return { success: true };
};

export default getTeamMembersAction;
