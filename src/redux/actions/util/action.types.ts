import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store/root.state";
import { ApplicationError } from "../../../types/application.error.type";

export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, any>;

export interface ActionResult extends ApplicationError {
  success: boolean;
}
