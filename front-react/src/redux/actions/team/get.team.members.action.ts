import { Dispatch } from "react";
import { Action } from "redux";
import beginApiCallAction from "../global/begin.api.call.action";
import * as TogetherApi from "../../../api/team/get.team.members";
import { ApiStatus } from "../../../api/setup/together.api";
import { action } from "../global/generic.actions";
import { TeamMember } from "../../../types/user.type";
import { ThunkResult } from "../../types/thunk.result";
import { ActionResult } from "../../types/action.result";
import { Context, Result, Type } from "../../types/action.types";
import { typeFor } from "../../logic/action-types/redux.action.type.generation";

const type = Type.getTeamMembers;

const getTeamMembersAction = (
  teamId: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(beginApiCallAction(Context.Global));

  const result = await TogetherApi.getTeamMembers(teamId);
  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(
      action(typeFor(type, Context.Global, Result.Failure), result.error)
    );
    return { success: false, message: result.error?.message };
  }

  const teamMembers = result.data as Array<TeamMember>;

  dispatch(action(typeFor(type, Context.Global, Result.Success), teamMembers));
  return { success: true };
};

export default getTeamMembersAction;
