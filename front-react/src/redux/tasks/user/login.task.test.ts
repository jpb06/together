import { createMemoryHistory } from "history";
import { call, put } from "redux-saga/effects";

import { LoginResult, loginTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi, { sendAnonymous } from "../../../api/setup/together.api";
import { isResultValid } from "../../../api/validation/login.result.validation";
import { initializeLoggedUserContext } from "../../../logic/user.util";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { payloadAction, successPayloadAction } from "../../actions";

describe("login task", () => {
  it("should throw an error if the login failed", () => {
    const history = createMemoryHistory();

    const task = loginTask(
      { login: "login", password: "password", history },
      Context.Global
    );

    expect(task.next().value).toEqual(
      call(sendAnonymous, `http://api.com/${ApiRoutes.Login}`, {
        login: "login",
        password: "password",
      })
    );

    const apiCallResult = {
      success: false,
      error: "Invalid credentials",
    };
    expect(task.next(apiCallResult as any).value).toEqual(
      call(isResultValid, apiCallResult)
    );

    expect(task.next(false as any).value).toEqual(
      put(payloadAction(Type.LoginStateFailed))
    );

    expect(() => task.next()).toThrow("The authentication failed");
    expect(task.next().done).toBe(true);
  });

  it("should throw an error if the login api call response is invalid", () => {
    const history = createMemoryHistory();

    const task = loginTask(
      { login: "login", password: "password", history },
      Context.Global
    );

    expect(task.next().value).toEqual(
      call(sendAnonymous, `http://api.com/${ApiRoutes.Login}`, {
        login: "login",
        password: "password",
      })
    );

    const apiResult = {
      success: true,
      payload: { token: "yolo", expirationDate: "now" },
    };
    expect(task.next(apiResult as any).value).toEqual(
      call(isResultValid, apiResult as any)
    );

    expect(task.next().value).toEqual(
      put(payloadAction(Type.LoginStateFailed))
    );

    expect(() => console.log(task.next().value)).toThrow(
      "The authentication failed"
    );
    expect(task.next().done).toBe(true);
  });

  it("should redirect if login succeeded and context is global", () => {
    const history = createMemoryHistory();

    const task = loginTask(
      { login: "login", password: "password", history },
      Context.Global
    );

    expect(task.next().value).toEqual(
      call(sendAnonymous, `http://api.com/${ApiRoutes.Login}`, {
        login: "login",
        password: "password",
      })
    );

    const apiResult = {
      success: true,
      payload: {
        user: {
          id: "23",
          lastName: "Yoloman",
          firstName: "McCool",
          avatarName: "supercool.gif",
          email: "yolo.man@cool.org",
          teams: [],
          teamInvites: [],
          teamJoinRequests: [],
        },
        expirationDate: new Date().toISOString(),
        token: "Yolo",
      },
    };
    expect(task.next(apiResult as any).value).toEqual(
      call(isResultValid, apiResult)
    );

    expect(task.next(true as any).value).toEqual(
      call(initializeLoggedUserContext, apiResult.payload as LoginResult)
    );

    const user = initializeLoggedUserContext(apiResult.payload);
    expect(task.next(user as any).value).toEqual(
      call(TogetherApi.setup, history)
    );

    expect(task.next().value).toEqual(
      put(successPayloadAction(Type.Login, Context.Global, user))
    );
    expect(task.next().value).toEqual(put(payloadAction(Type.LoginStateReset)));

    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/");
    expect(task.next().done).toBe(true);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe("/main");
  });

  it("should not redirect if login succeeded and context is not global", () => {
    const history = createMemoryHistory();

    const task = loginTask(
      { login: "login", password: "password", history },
      Context.Onboarding
    );

    expect(task.next().value).toEqual(
      call(sendAnonymous, `http://api.com/${ApiRoutes.Login}`, {
        login: "login",
        password: "password",
      })
    );

    const apiResult = {
      success: true,
      payload: {
        user: {
          id: "23",
          lastName: "Yoloman",
          firstName: "McCool",
          avatarName: "supercool.gif",
          email: "yolo.man@cool.org",
          teams: [],
          teamInvites: [],
          teamJoinRequests: [],
        },
        expirationDate: new Date().toISOString(),
        token: "Yolo",
      },
    };
    expect(task.next(apiResult as any).value).toEqual(
      call(isResultValid, apiResult)
    );

    expect(task.next(true as any).value).toEqual(
      call(initializeLoggedUserContext, apiResult.payload as LoginResult)
    );

    const user = initializeLoggedUserContext(apiResult.payload);
    expect(task.next(user as any).value).toEqual(
      call(TogetherApi.setup, history)
    );

    expect(task.next().value).toEqual(
      put(successPayloadAction(Type.Login, Context.Onboarding, user))
    );
    expect(task.next().value).toEqual(put(payloadAction(Type.LoginStateReset)));

    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/");
    expect(task.next().done).toBe(true);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/");
  });
});
