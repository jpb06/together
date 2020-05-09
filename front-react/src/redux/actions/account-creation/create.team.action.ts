import * as TogetherApi from "../../../api/team/create.team";
import { notice, action } from "../global/generic.actions";
import { ReduxDispatch } from "../../../hooks/redux.hooks";
import { ApiStatus } from "../../../api/setup/together.api";
import { sendSnackbarFeedbackFromApiErrorAction } from "../global/snackbar.feedback.actions";
import { ThunkResult } from "../../types/thunk.result";
import { ActionResult } from "../../types/action.result";
import { Context, Result, Type } from "../../types/action.types";
import beginApiCallAction from "../global/begin.api.call.action";
import { typeFor } from "../../logic/action-types/redux.action.type.generation";

const type = Type.createTeam;
const context = Context.AccountCreation;

const createTeamAction = (
  name: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: ReduxDispatch) => {
  dispatch(beginApiCallAction(context));

  const result = await TogetherApi.createTeam(name);

  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(sendSnackbarFeedbackFromApiErrorAction(result.error));
    dispatch(notice(typeFor(type, context, Result.Failure)));
    return { success: false };
  }

  dispatch(
    action(typeFor(type, context, Result.Success), { id: result.data, name })
  );
  return { success: true };
};

export default createTeamAction;
