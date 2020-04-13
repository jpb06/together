import {
  ACCEPT_TEAM_INVITE_SUCCESS,
  ACCEPT_TEAM_INVITE_FAILURE,
  ThunkResult,
  ActionResult
} from "../util/action.types";
import { Dispatch } from "react";
import * as TogetherApi from "../../../api/user/accept.team.invite";
import { Action } from "redux";
import beginApiCallAction from "../begin.api.call.action";
import { action } from "../util/generic.actions";
import { ApiStatus } from "../../../api/setup/together.api";

const acceptTeamInviteAction = (
  inviteId: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(beginApiCallAction());

  const result = await TogetherApi.acceptTeamInvite(inviteId);
  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(action(ACCEPT_TEAM_INVITE_FAILURE, result.error));
    return { success: false };
  }

  dispatch(action(ACCEPT_TEAM_INVITE_SUCCESS, inviteId));
  return { success: true };
};

export default acceptTeamInviteAction;
