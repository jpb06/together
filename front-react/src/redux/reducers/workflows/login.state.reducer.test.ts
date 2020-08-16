import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { payloadAction } from "../../actions";
import { initialState } from "../../store/root.state";
import loginStateReducer from "./login.state.reducer";

describe("Login state reducer", () => {
  it("should initialize properly", () => {
    const reducer = loginStateReducer(undefined, payloadAction("Init" as Type));

    expect(reducer).toStrictEqual(initialState.loginState);
  });

  it("should reset its state when asked", () => {
    const reducer = loginStateReducer(
      { ...initialState.loginState, isSubmitted: true },
      payloadAction(Type.LoginStateReset)
    );

    expect(reducer).toStrictEqual(initialState.loginState);
  });

  it("should alter its state on retry", () => {
    const reducer = loginStateReducer(
      initialState.loginState,
      payloadAction(Type.LoginStateRetry)
    );

    expect(reducer).toStrictEqual({
      ...initialState.loginState,
      actionText: "Login",
      isSubmitted: true,
      isErrored: false,
    });
  });

  it("should alter its state on loading", () => {
    const reducer = loginStateReducer(
      initialState.loginState,
      payloadAction(Type.LoginStatePending)
    );

    expect(reducer).toStrictEqual({
      ...initialState.loginState,
      actionText: "Logging in ...",
      isPending: true,
    });
  });

  it("should alter its state when email is not valid", () => {
    const reducer = loginStateReducer(
      initialState.loginState,
      payloadAction(Type.LoginStateInvalidEmail)
    );

    expect(reducer).toStrictEqual({
      ...initialState.loginState,
      actionText: "Not a valid email",
      isPending: false,
      isErrored: true,
    });
  });

  it("should alter its state when login failed", () => {
    const reducer = loginStateReducer(
      initialState.loginState,
      payloadAction(Type.LoginStateFailed)
    );

    expect(reducer).toStrictEqual({
      ...initialState.loginState,
      actionText: "Failure && Try again ?",
      isPending: false,
      isErrored: true,
    });
  });
});
