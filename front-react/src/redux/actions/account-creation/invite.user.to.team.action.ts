import * as TogetherApi from "../../../api/user/invite.user.to.join.team";
import { action } from "../global/generic.actions";
import { ReduxDispatch } from "../../../hooks/redux.hooks";
import { ApiStatus } from "../../../api/setup/together.api";
import { TerseUser } from "../../../types/user.type";
import { ActionResult } from "../../types/action.result";
import { ThunkResult } from "../../types/thunk.result";
import { Context, Result, Type } from "../../types/action.types";
import beginApiCallAction from "../global/begin.api.call.action";
import { typeFor } from "../../logic/action-types/redux.action.type.generation";

const type = Type.inviteUser;

interface InviteUserResult extends ActionResult {
  user?: TerseUser;
}

const inviteUserToTeamAction = (
  teamId: string,
  email: string,
  context: Context
): ThunkResult<Promise<InviteUserResult>> => async (
  dispatch: ReduxDispatch
) => {
  dispatch(beginApiCallAction(context));

  const result = await TogetherApi.inviteUser(teamId, email);
  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(
      action(typeFor(type, context, Result.Failure), result.error?.message)
    );

    return { success: false };
  }

  dispatch(action(typeFor(type, context, Result.Success), result.data));

  return { success: true, user: result.data };
};

export default inviteUserToTeamAction;
