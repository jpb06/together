import SnackbarFeedback from "../../types/snackbar.feedback.type";
import { initialState } from "../store/root.state";
import { ActionWithPayload } from "../actions/util/generic.actions";
import {
  isFailureActionType,
  CLEAR_FEEDBACK,
  SHOW_ERROR_FEEDBACK,
  SHOW_INFO_FEEDBACK,
  SHOW_SUCCESS_FEEDBACK,
  SHOW_WARNING_FEEDBACK,
  BEGIN_API_CALL
} from "../actions/util/action.types";
import { MessageType } from "../../components/feedback/FeedbackSnackbarContent";

const snackbarFeedbackReducer = (
  state: SnackbarFeedback | null = initialState.snackbarFeedback,
  action: ActionWithPayload<string, string>
) => {
  if (isFailureActionType(action.type) || action.type === SHOW_ERROR_FEEDBACK) {
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

  if (action.type === CLEAR_FEEDBACK || action.type === BEGIN_API_CALL) {
    return null;
  }

  return state;
};

export { snackbarFeedbackReducer };
