import { initialState } from "../store/root.state";
import { ActionWithPayload } from "../actions/util/generic.actions";
import {
  isFailureActionType,
  CLEAR_ERROR,
  SET_ERROR,
  BEGIN_API_CALL
} from "../actions/util/action.types";

const errorReducer = (
  state: any = initialState.error,
  action: ActionWithPayload<string, string>
) => {
  if (isFailureActionType(action.type) || action.type === SET_ERROR) {
    return action.payload;
  }

  if (action.type === CLEAR_ERROR || action.type === BEGIN_API_CALL) {
    return null;
  }

  return state;
};

export { errorReducer };
