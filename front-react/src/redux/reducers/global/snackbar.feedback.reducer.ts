import SnackbarFeedback from "../../types/snackbar.feedback.type";
import { initialState } from "../../store/root.state";
import {
  ActionWithPayload,
  DailyIsolatedPayload,
} from "../../actions/util/generic.actions";
import {
  isGlobalFailureActionType,
  CLEAR_FEEDBACK,
  SHOW_ERROR_FEEDBACK,
  SHOW_INFO_FEEDBACK,
  SHOW_SUCCESS_FEEDBACK,
  SHOW_WARNING_FEEDBACK,
  BEGIN_API_CALL,
  DAILY_FAILURE_ISOLATED,
  BEGIN_API_CALL_ACCOUNT_CREATION,
} from "../../actions/util/action.types";
import { MessageType } from "../../../components/generic/feedback/FeedbackSnackbarContent";

const snackbarFeedbackReducer = (
  state: SnackbarFeedback = initialState.snackbarFeedback,
  action: ActionWithPayload<string, string | DailyIsolatedPayload>
) => {
  if (action.type === DAILY_FAILURE_ISOLATED) {
    const payload = action.payload as DailyIsolatedPayload;
    return { type: MessageType.Error, message: payload.error };
  }

  if (
    isGlobalFailureActionType(action.type) ||
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

  if (
    action.type === CLEAR_FEEDBACK ||
    action.type === BEGIN_API_CALL ||
    action.type === BEGIN_API_CALL_ACCOUNT_CREATION
  ) {
    return { ...state, message: "" };
  }

  return state;
};

export default snackbarFeedbackReducer;
