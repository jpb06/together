import { initialState } from "../../store/root.state";
import { Action } from "redux";
import { Context, Type, Result } from "../../types/action.types";
import { check } from "../../logic/action-types/redux.action.type.validation";

const apiStatusReducer = (
  state: number = initialState.apiCallsInProgress,
  action: Action
) => {
  if (check(action.type).is(Type.beginApiCall).for(Context.Global).truthy()) {
    return state + 1;
  } else if (
    check(action.type).for(Context.Global).as(Result.Failure).truthy() ||
    check(action.type).for(Context.Global).as(Result.Success).truthy()
  ) {
    return state - 1;
  }

  return state;
};

export default apiStatusReducer;
