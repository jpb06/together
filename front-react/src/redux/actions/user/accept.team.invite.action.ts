import { Dispatch } from "react";
import * as TogetherApi from "../../../api/user/accept.team.invite";
import { Action } from "redux";
import beginApiCallAction from "../global/begin.api.call.action";
import { action } from "../global/generic.actions";
import { ApiStatus } from "../../../api/setup/together.api";
import { ThunkResult } from "../../types/thunk.result";
import { ActionResult } from "../../types/action.result";
import { Context, Result, Type } from "../../types/action.types";
import { typeFor } from "../../logic/action-types/redux.action.type.generation";

const type = Type.acceptTeamInvite;

const acceptTeamInviteAction = (
  inviteId: string,
  context: Context
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(beginApiCallAction(context));

  const result = await TogetherApi.acceptTeamInvite(inviteId);
  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(action(typeFor(type, context, Result.Failure), result.error));
    return { success: false };
  }

  dispatch(action(typeFor(type, context, Result.Success), inviteId));
  return { success: true };
};

export default acceptTeamInviteAction;
