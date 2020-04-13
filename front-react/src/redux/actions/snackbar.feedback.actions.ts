import {
  SHOW_ERROR_FEEDBACK,
  SHOW_INFO_FEEDBACK,
  SHOW_SUCCESS_FEEDBACK,
  SHOW_WARNING_FEEDBACK,
  ThunkResult,
} from "../actions/util/action.types";
import { MessageType } from "../../components/feedback/FeedbackSnackbarContent";
import { Dispatch } from "react";
import { Action } from "redux";
import { action } from "./util/generic.actions";

const sendSnackbarFeedbackAction = (
  type: MessageType,
  message: string
): ThunkResult<void> => (dispatch: Dispatch<Action>) => {
  let actionType: string = "";

  switch (type) {
    case MessageType.Error:
      actionType = SHOW_ERROR_FEEDBACK;
      break;
    case MessageType.Info:
      actionType = SHOW_INFO_FEEDBACK;
      break;
    case MessageType.Success:
      actionType = SHOW_SUCCESS_FEEDBACK;
      break;
    case MessageType.Warning:
      actionType = SHOW_WARNING_FEEDBACK;
      break;
  }

  dispatch(action(actionType, message));
};

export default sendSnackbarFeedbackAction;
