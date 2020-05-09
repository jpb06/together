import * as TogetherApi from "../../../api/anonymous/create.user.api";
import { notice } from "../global/generic.actions";
import { loginAction } from "../user/login.action";
import { ReduxDispatch } from "../../../hooks/redux.hooks";
import { NewUser } from "../../../types/user.type";
import { MessageType } from "../../../components/generic/feedback/FeedbackSnackbarContent";
import { ApiStatus } from "../../../api/setup/together.api";
import { sendSnackbarFeedbackAction } from "../global/snackbar.feedback.actions";
import { ThunkResult } from "../../types/thunk.result";
import { ActionResult } from "../../types/action.result";
import { Context, Result, Type } from "../../types/action.types";
import beginApiCallAction from "../global/begin.api.call.action";
import { typeFor } from "../../logic/action-types/redux.action.type.generation";

const getMessageActionFromStatus = (
  status: TogetherApi.CreateNewUserStatus
) => {
  let message = "An error occured while creating your account";
  let messageType = MessageType.Error;

  if (status === TogetherApi.CreateNewUserExtendedStatus.EmailAlreadyInUse) {
    message = "This email is already in use";
    messageType = MessageType.Warning;
  }

  return sendSnackbarFeedbackAction(messageType, message);
};

const context = Context.AccountCreation;

const CreateUserAction = (
  user: NewUser
): ThunkResult<Promise<ActionResult>> => async (dispatch: ReduxDispatch) => {
  dispatch(beginApiCallAction(context));

  const result = await TogetherApi.createNewUser(user);
  if (result.status !== ApiStatus.Ok) {
    dispatch(getMessageActionFromStatus(result.status));
    dispatch(notice(typeFor(Type.createUser, context, Result.Failure)));

    return { success: false };
  }

  const loginResult = await dispatch(loginAction(user.email, user.password));

  return { success: loginResult.success };
};

export default CreateUserAction;
