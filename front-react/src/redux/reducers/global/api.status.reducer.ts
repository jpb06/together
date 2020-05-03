import { initialState } from "../../store/root.state";
import { Action } from "redux";
import {
  BEGIN_API_CALL,
  isGlobalSuccessActionType,
  isGlobalFailureActionType,
} from "../../actions/util/action.types";

const apiStatusReducer = (
  state: number = initialState.apiCallsInProgress,
  action: Action
) => {
  if (action.type === BEGIN_API_CALL) {
    return state + 1;
  } else if (
    isGlobalSuccessActionType(action.type) ||
    isGlobalFailureActionType(action.type)
  ) {
    return state - 1;
  }

  return state;
};

export default apiStatusReducer;
