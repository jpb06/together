import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store/root.state";
import ApplicationError from "../../../types/application.error.type";

/* **************************************************************************************************
   Generic
   ************************************************************************************************** */

export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const BEGIN_API_CALL_DAILY = "BEGIN_API_CALL_DAILY";

/* **************************************************************************************************
   Errors
   ************************************************************************************************** */

export const CLEAR_ERROR = "CLEAR_ERROR";
export const SET_ERROR = "SET_ERROR";

/* **************************************************************************************************
   Feedback (Snackbar)
   ************************************************************************************************** */

export const SHOW_ERROR_FEEDBACK = "SHOW_ERROR_FEEDBACK";
export const SHOW_INFO_FEEDBACK = "SHOW_INFO_FEEDBACK";
export const SHOW_SUCCESS_FEEDBACK = "SHOW_SUCCESS_FEEDBACK";
export const SHOW_WARNING_FEEDBACK = "SHOW_WARNING_FEEDBACK";
export const CLEAR_FEEDBACK = "CLEAR_FEEDBACK";

/* **************************************************************************************************
   Login
   ************************************************************************************************** */

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

/* **************************************************************************************************
   User
   ************************************************************************************************** */

export const UPDATE_USER = "UPDATE_USER";
export const GET_USER_TEAMS_SUCCESS = "GET_USER_TEAMS_SUCCESS";
export const GET_USER_TEAMS_FAILURE = "GET_USER_TEAMS_FAILURE";
export const ACCEPT_TEAM_INVITE_SUCCESS = "ACCEPT_TEAM_INVITE_SUCCESS";
export const ACCEPT_TEAM_INVITE_FAILURE = "ACCEPT_TEAM_INVITE_FAILURE";
export const DECLINE_TEAM_INVITE_SUCCESS = "DECLINE_TEAM_INVITE_SUCCESS";
export const DECLINE_TEAM_INVITE_FAILURE = "DECLINE_TEAM_INVITE_FAILURE";
export const GET_TIMELINE_SUCCESS = "GET_TIMELINE_SUCCESS";
export const GET_TIMELINE_FAILURE = "GET_TIMELINE_FAILURE";

/* **************************************************************************************************
   Team
   ************************************************************************************************** */

export const GET_TEAM_MEMBERS_SUCCESS = "GET_TEAM_MEMBERS_SUCCESS";
export const GET_TEAM_MEMBERS_FAILURE = "GET_TEAM_MEMBERS_FAILURE";

/* **************************************************************************************************
   Daily
   ************************************************************************************************** */

export const GET_DAILY_SUCCESS = "GET_DAILY_SUCCESS";
export const GET_DAILY_FAILURE = "GET_DAILY_FAILURE";

export const DAILY_SUCCESS_ISOLATED = "DAILY_SUCCESS_ISOLATED";
export const DAILY_FAILURE_ISOLATED = "DAILY_FAILURE_ISOLATED";

/* **************************************************************************************************
   Action types discriminators
   ************************************************************************************************** */

const isGlobalSuccessActionType = (type: string): boolean =>
  type.endsWith("_SUCCESS");
const isGlobalFailureActionType = (type: string): boolean =>
  type.endsWith("_FAILURE");
const isDailyIsolatedFeedback = (type: string): boolean =>
  type === DAILY_SUCCESS_ISOLATED || type === DAILY_FAILURE_ISOLATED;

export {
  isGlobalSuccessActionType,
  isGlobalFailureActionType,
  isDailyIsolatedFeedback,
};

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, any>;

export interface ActionResult extends ApplicationError {
  success: boolean;
}
