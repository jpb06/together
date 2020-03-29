import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store/root.state";
import ApplicationError from "../../../types/application.error.type";

export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const SHOW_ERROR_FEEDBACK = "SHOW_ERROR_FEEDBACK";
export const SHOW_INFO_FEEDBACK = "SHOW_INFO_FEEDBACK";
export const SHOW_SUCCESS_FEEDBACK = "SHOW_SUCCESS_FEEDBACK";
export const SHOW_WARNING_FEEDBACK = "SHOW_WARNING_FEEDBACK";
export const CLEAR_FEEDBACK = "CLEAR_FEEDBACK";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const SET_ERROR = "SET_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const UPDATE_USER = "UPDATE_USER";
export const GET_USER_TEAMS_SUCCESS = "GET_USER_TEAMS_SUCCESS";
export const GET_USER_TEAMS_FAILURE = "GET_USER_TEAMS_FAILURE";
export const ACCEPT_TEAM_INVITE_SUCCESS = "ACCEPT_TEAM_INVITE_SUCCESS";
export const ACCEPT_TEAM_INVITE_FAILURE = "ACCEPT_TEAM_INVITE_FAILURE";
export const DECLINE_TEAM_INVITE_SUCCESS = "DECLINE_TEAM_INVITE_SUCCESS";
export const DECLINE_TEAM_INVITE_FAILURE = "DECLINE_TEAM_INVITE_FAILURE";
export const GET_TIMELINE_SUCCESS = "GET_TIMELINE_SUCCESS";
export const GET_TIMELINE_FAILURE = "GET_TIMELINE_FAILURE";

const isSuccessActionType = (type: string): boolean =>
  type.substring(type.length - 8) === "_SUCCESS";
const isFailureActionType = (type: string): boolean =>
  type.substring(type.length - 8) === "_FAILURE";

export { isSuccessActionType, isFailureActionType };

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, any>;

export interface ActionResult extends ApplicationError {
  success: boolean;
}
