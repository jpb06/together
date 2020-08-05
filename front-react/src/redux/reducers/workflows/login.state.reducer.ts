import { ActionWithPayload, ReduxActionType as Type } from "../../../types/redux";
import { LoginState } from "../../../types/redux/workflows/login.state.interface";
import { initialState } from "../../store/root.state";

const loginStateReducer = (
  state: LoginState = initialState.loginState,
  action: ActionWithPayload<any>
) => {
  if (action.type === Type.LoginStateReset) {
    return {
      ...state,
      actionText: "Login",
      isSubmitted: true,
      isErrored: false,
    };
  }

  if (action.type === Type.LoginStatePending) {
    return {
      ...state,
      actionText: "Logging in ...",
      isPending: true,
    };
  }

  if (action.type === Type.LoginStateInvalidEmail) {
    return {
      ...state,
      actionText: "Not a valid email",
      isPending: false,
      isErrored: true,
    };
  }

  if (action.type === Type.LoginStateFailed) {
    return {
      ...state,
      actionText: "Failure && Try again ?",
      isPending: false,
      isErrored: true,
    };
  }

  return state;
};

export default loginStateReducer;
