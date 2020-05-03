import {
  ThunkResult,
  ActionResult,
  BEGIN_API_CALL_ACCOUNT_CREATION,
  CREATE_TEAM_FAILURE_ISOLATED,
  CREATE_TEAM_SUCCESS_ISOLATED,
} from "../util/action.types";
import * as TogetherApi from "../../../api/team/create.team";
import { notice, action } from "../util/generic.actions";
import { ReduxDispatch } from "../../../hooks/redux.hooks";
import { ApiStatus } from "../../../api/setup/together.api";
import { sendSnackbarFeedbackFromApiErrorAction } from "../snackbar.feedback.actions";

const createTeamAction = (
  name: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: ReduxDispatch) => {
  dispatch(notice(BEGIN_API_CALL_ACCOUNT_CREATION));

  const result = await TogetherApi.createTeam(name);

  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(sendSnackbarFeedbackFromApiErrorAction(result.error));
    dispatch(notice(CREATE_TEAM_FAILURE_ISOLATED));
    return { success: false };
  }

  dispatch(action(CREATE_TEAM_SUCCESS_ISOLATED, { id: result.data, name }));
  return { success: true };
};

export default createTeamAction;
