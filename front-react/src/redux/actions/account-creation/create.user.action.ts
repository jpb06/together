import {
  ThunkResult,
  ActionResult,
  BEGIN_API_CALL_ACCOUNT_CREATION,
  CREATE_USER_FAILURE_ISOLATED,
} from "../util/action.types";
import * as TogetherApi from "../../../api/anonymous/create.user.api";
import { notice } from "../util/generic.actions";
import { loginAction } from "../user/login.action";
import { ReduxDispatch } from "../../../hooks/redux.hooks";
import { NewUser } from "../../../types/user.type";
import { MessageType } from "../../../components/generic/feedback/FeedbackSnackbarContent";
import { ApiStatus } from "../../../api/setup/together.api";
import { sendSnackbarFeedbackAction } from "../snackbar.feedback.actions";

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

const CreateUserAction = (
  user: NewUser
): ThunkResult<Promise<ActionResult>> => async (dispatch: ReduxDispatch) => {
  dispatch(notice(BEGIN_API_CALL_ACCOUNT_CREATION));

  const result = await TogetherApi.createNewUser(user);

  if (result.status !== ApiStatus.Ok) {
    dispatch(getMessageActionFromStatus(result.status));
    dispatch(notice(CREATE_USER_FAILURE_ISOLATED));
    return { success: false };
  }

  const loginResult = await dispatch(loginAction(user.email, user.password));

  return { success: loginResult.success };
};

export default CreateUserAction;
