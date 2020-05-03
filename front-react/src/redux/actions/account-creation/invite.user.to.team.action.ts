import {
  ThunkResult,
  ActionResult,
  BEGIN_API_CALL_ACCOUNT_CREATION,
  INVITE_USER_FAILURE_ISOLATED,
  INVITE_USER_SUCCESS_ISOLATED,
} from "../util/action.types";
import * as TogetherApi from "../../../api/user/invite.user.to.join.team";
import { notice, action } from "../util/generic.actions";
import { ReduxDispatch } from "../../../hooks/redux.hooks";
import { ApiStatus } from "../../../api/setup/together.api";
import { sendSnackbarFeedbackFromApiErrorAction } from "../snackbar.feedback.actions";
import { TerseUser } from "../../../types/user.type";

interface InviteUserResult extends ActionResult {
  user?: TerseUser;
}

const inviteUserToTeamAction = (
  teamId: string,
  email: string
): ThunkResult<Promise<InviteUserResult>> => async (
  dispatch: ReduxDispatch
) => {
  dispatch(notice(BEGIN_API_CALL_ACCOUNT_CREATION));

  const result = await TogetherApi.inviteUser(teamId, email);

  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(sendSnackbarFeedbackFromApiErrorAction(result.error));
    dispatch(notice(INVITE_USER_FAILURE_ISOLATED));
    return { success: false };
  }

  dispatch(action(INVITE_USER_SUCCESS_ISOLATED, result.data));
  return { success: true, user: result.data };
};

export default inviteUserToTeamAction;
