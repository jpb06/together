import React from "react";
import { mocked } from "ts-jest/utils";

import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { loginAction, payloadAction } from "../../../redux/actions";
import { connectedRender } from "../../../redux/test-utils/connected.render.helper";
import { ReduxActionType as Type } from "../../../types/redux";
import LoginContainer from "./LoginContainer";

describe("Login container component", () => {
  it("should contain a link to create an account", () => {
    connectedRender(<LoginContainer />);
    // logRoles(container);
    // debug(container);

    const mainLink = screen.getByRole("link", {
      name: /together/i,
    });
    expect(mainLink).toHaveAttribute("href", "/");
    const newAccountLink = screen.getByRole("link", {
      name: /I don't have an account/i,
    });
    expect(newAccountLink).toHaveAttribute("href", "/newaccount");
  });

  it("should have an empty form on init", () => {
    const { container, debug } = connectedRender(<LoginContainer />);

    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    expect(emailField).toHaveValue("");
    expect(passwordField).toHaveValue("");
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton.children[0].children[1].textContent).toBe("Login");
  });

  it("should only reset the form if user has not filled email and password fields", () => {
    const { store } = connectedRender(<LoginContainer />);

    userEvent.type(screen.getByLabelText(/email/i), "");
    userEvent.type(screen.getByLabelText(/password/i), "");

    const loginButton = screen.getByRole("button", { name: /Login/i });
    userEvent.click(loginButton);
    expect(loginButton.children[0].children[1].textContent).toBe("Login");

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(
      payloadAction(Type.LoginStateRetry)
    );
  });

  it("should not send a login request if user has not typed a valid email", async () => {
    const { store } = connectedRender(<LoginContainer />);

    userEvent.type(screen.getByLabelText(/email/i), "yolo");
    userEvent.type(screen.getByLabelText(/password/i), "23");

    const loginButton = screen.getByRole("button", { name: /Login/i });
    userEvent.click(loginButton);

    await waitFor(() => screen.getByText("Not a valid email"));

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      1,
      payloadAction(Type.LoginStateRetry)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      2,
      payloadAction(Type.LoginStatePending)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      3,
      payloadAction(Type.LoginStateInvalidEmail)
    );
  });

  it("should send a login request", async () => {
    const { store, history } = connectedRender(<LoginContainer />);

    const credentials = { email: "a@a.com", password: "23" };

    userEvent.type(screen.getByLabelText(/email/i), credentials.email);
    userEvent.type(screen.getByLabelText(/password/i), credentials.password);

    const loginButton = screen.getByRole("button", { name: /Login/i });
    userEvent.click(loginButton);

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      1,
      payloadAction(Type.LoginStateRetry)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      2,
      payloadAction(Type.LoginStatePending)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      3,
      loginAction(credentials.email, credentials.password, history)
    );
  });

  it("should report on a pending action", async () => {
    expect(
      screen.queryByRole("progressbar", { name: "linear-pending" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("progressbar", { name: "circular-pending" })
    ).not.toBeInTheDocument();

    const { store } = connectedRender(<LoginContainer />);

    store.dispatch(payloadAction(Type.LoginStatePending));

    await waitFor(() => screen.getByText("Logging in ..."));

    screen.getByRole("progressbar", { name: "linear-pending" });
    screen.getByRole("progressbar", { name: "circular-pending" });
  });

  it("should report on a login failure", async () => {
    const { store } = connectedRender(<LoginContainer />);

    store.dispatch(payloadAction(Type.LoginStateFailed));

    await waitFor(() => screen.getByText("Failure && Try again ?"));
  });
});
