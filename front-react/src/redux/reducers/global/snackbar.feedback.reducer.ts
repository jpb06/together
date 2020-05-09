import SnackbarFeedback from "../../types/snackbar.feedback.type";
import { initialState } from "../../store/root.state";
import {
  CLEAR_FEEDBACK,
  SHOW_ERROR_FEEDBACK,
  SHOW_INFO_FEEDBACK,
  SHOW_SUCCESS_FEEDBACK,
  SHOW_WARNING_FEEDBACK,
  Context,
  Type,
  Result,
} from "../../types/action.types";
import { MessageType } from "../../../components/generic/feedback/FeedbackSnackbarContent";
import {
  ActionWithPayload,
  DailyIsolatedPayload,
} from "../../types/action.payloads";
import { check } from "../../logic/action-types/redux.action.type.validation";

const snackbarFeedbackReducer = (
  state: SnackbarFeedback = initialState.snackbarFeedback,
  action: ActionWithPayload<string, string | DailyIsolatedPayload>
) => {
  if (
    check(action.type)
      .is(Type.daily)
      .for(Context.Daily)
      .as(Result.Failure)
      .truthy()
  ) {
    const payload = action.payload as DailyIsolatedPayload;
    return { type: MessageType.Error, message: payload.error };
  }

  if (
    check(action.type).for(Context.Global).as(Result.Failure).truthy() ||
    action.type === SHOW_ERROR_FEEDBACK
  ) {
    return { type: MessageType.Error, message: action.payload };
  }

  if (action.type === SHOW_INFO_FEEDBACK) {
    return { type: MessageType.Info, message: action.payload };
  }

  if (action.type === SHOW_SUCCESS_FEEDBACK) {
    return { type: MessageType.Success, message: action.payload };
  }

  if (action.type === SHOW_WARNING_FEEDBACK) {
    return { type: MessageType.Warning, message: action.payload };
  }

  const actionTypeCheck = check(action.type).is(Type.beginApiCall);
  if (
    action.type === CLEAR_FEEDBACK ||
    actionTypeCheck.for(Context.Global).truthy() ||
    actionTypeCheck.for(Context.AccountCreation).truthy()
  ) {
    return { ...state, message: "" };
  }

  return state;
};

export default snackbarFeedbackReducer;
