import * as TogetherApi from "../../../api/user/invite.user.to.join.team";
import { notice, action } from "../global/generic.actions";
import { ReduxDispatch } from "../../../hooks/redux.hooks";
import { ApiStatus } from "../../../api/setup/together.api";
import { sendSnackbarFeedbackFromApiErrorAction } from "../global/snackbar.feedback.actions";
import { TerseUser } from "../../../types/user.type";
import { ActionResult } from "../../types/action.result";
import { ThunkResult } from "../../types/thunk.result";
import { Context, Result, Type } from "../../types/action.types";
import beginApiCallAction from "../global/begin.api.call.action";
import { typeFor } from "../../logic/action-types/redux.action.type.generation";

const type = Type.inviteUser;
const context = Context.AccountCreation;

interface InviteUserResult extends ActionResult {
  user?: TerseUser;
}

const inviteUserToTeamAction = (
  teamId: string,
  email: string
): ThunkResult<Promise<InviteUserResult>> => async (
  dispatch: ReduxDispatch
) => {
  dispatch(beginApiCallAction(context));

  const result = await TogetherApi.inviteUser(teamId, email);
  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(sendSnackbarFeedbackFromApiErrorAction(result.error));
    dispatch(notice(typeFor(type, context, Result.Failure)));

    return { success: false };
  }

  dispatch(action(typeFor(type, context, Result.Success), result.data));

  return { success: true, user: result.data };
};

export default inviteUserToTeamAction;
