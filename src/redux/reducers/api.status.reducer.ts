import { initialState } from "../store/root.state";
import { Action } from "redux";
import { BEGIN_API_CALL } from "./../actions/util/action.types";

const isSuccessActionType = (type: string): boolean =>
  type.substring(type.length - 8) === "_SUCCESS";
const isFailureActionType = (type: string): boolean =>
  type.substring(type.length - 8) === "_FAILURE";

const apiStatusReducer = (
  state: number = initialState.apiCallsInProgress,
  action: Action
) => {
  if (action.type === BEGIN_API_CALL) {
    return state + 1;
  } else if (
    isSuccessActionType(action.type) ||
    isFailureActionType(action.type)
  ) {
    return state - 1;
  }

  return state;
};

export { apiStatusReducer };
