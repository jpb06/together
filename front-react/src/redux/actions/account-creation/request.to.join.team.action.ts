import {
  ThunkResult,
  ActionResult,
  BEGIN_API_CALL_ACCOUNT_CREATION,
  REQUEST_TO_JOIN_TEAM_FAILURE_ISOLATED,
  REQUEST_TO_JOIN_TEAM_SUCCESS_ISOLATED,
} from "../util/action.types";
import * as TogetherApi from "../../../api/user/request.to.join.team";
import { notice, action } from "../util/generic.actions";
import { ReduxDispatch } from "../../../hooks/redux.hooks";
import { ApiStatus } from "../../../api/setup/together.api";
import { sendSnackbarFeedbackFromApiErrorAction } from "../snackbar.feedback.actions";

const requestTojoinTeamAction = (
  name: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: ReduxDispatch) => {
  dispatch(notice(BEGIN_API_CALL_ACCOUNT_CREATION));

  const result = await TogetherApi.requestToJoinTeam(name);

  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(sendSnackbarFeedbackFromApiErrorAction(result.error));
    dispatch(notice(REQUEST_TO_JOIN_TEAM_FAILURE_ISOLATED));
    return { success: false };
  }

  dispatch(action(REQUEST_TO_JOIN_TEAM_SUCCESS_ISOLATED, result.data));
  return { success: true };
};

export default requestTojoinTeamAction;
