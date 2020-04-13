import {
  DECLINE_TEAM_INVITE_SUCCESS,
  DECLINE_TEAM_INVITE_FAILURE,
  ThunkResult,
  ActionResult
} from "../util/action.types";
import { Dispatch } from "react";
import * as TogetherApi from "../../../api/user/decline.team.invite";
import { Action } from "redux";
import beginApiCallAction from "../begin.api.call.action";
import { action } from "../util/generic.actions";
import { ApiStatus } from "../../../api/setup/together.api";

const declineTeamInviteAction = (
  inviteId: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(beginApiCallAction());

  const result = await TogetherApi.declineTeamInvite(inviteId);
  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(action(DECLINE_TEAM_INVITE_FAILURE, result.error));
    return { success: false };
  }

  dispatch(action(DECLINE_TEAM_INVITE_SUCCESS, inviteId));
  return { success: true };
};

export default declineTeamInviteAction;
