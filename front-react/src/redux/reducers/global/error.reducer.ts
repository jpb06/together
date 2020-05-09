import { initialState } from "../../store/root.state";
import {
  CLEAR_ERROR,
  SET_ERROR,
  Context,
  Result,
  Type,
} from "../../types/action.types";
import { ActionWithPayload } from "../../types/action.payloads";
import { check } from "../../logic/action-types/redux.action.type.validation";

const errorReducer = (
  state: any = initialState.error,
  action: ActionWithPayload<string, string>
) => {
  if (
    check(action.type).for(Context.Global).as(Result.Failure).truthy() ||
    action.type === SET_ERROR
  ) {
    return action.payload;
  }

  if (
    action.type === CLEAR_ERROR ||
    check(action.type).is(Type.beginApiCall).for(Context.Global).truthy()
  ) {
    return null;
  }

  return state;
};

export default errorReducer;
