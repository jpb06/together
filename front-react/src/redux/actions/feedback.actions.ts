import { action, notice } from "./util/generic.actions";
import {
  SHOW_INFO_FEEDBACK,
  SHOW_ERROR_FEEDBACK,
  SHOW_SUCCESS_FEEDBACK,
  SHOW_WARNING_FEEDBACK,
  CLEAR_FEEDBACK
} from "./util/action.types";
import { Action } from "redux";

const showInfoFeedbackAction = (message: string): Action =>
  action(SHOW_INFO_FEEDBACK, message);
const showErrorFeedbackAction = (message: string): Action =>
  action(SHOW_ERROR_FEEDBACK, message);
const showSuccessFeedbackAction = (message: string): Action =>
  action(SHOW_SUCCESS_FEEDBACK, message);
const showWarningFeedbackAction = (message: string): Action =>
  action(SHOW_WARNING_FEEDBACK, message);

const clearFeedbackAction = (): Action => notice(CLEAR_FEEDBACK);

export {
  showInfoFeedbackAction,
  showErrorFeedbackAction,
  showSuccessFeedbackAction,
  showWarningFeedbackAction,
  clearFeedbackAction
};
