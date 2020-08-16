import { createMemoryHistory } from "history";
import { call } from "redux-saga/effects";

import { loginTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import { sendAnonymous } from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { CreateUserStatus, createUserTask } from "./create.user.task";

describe("Create user task", () => {
  it("should throw an error if api call fails", () => {
    const history = createMemoryHistory();
    const params = {
      lastName: "Batman",
      firstName: "Thelad",
      email: "batman@batcave.cool",
      password: "robin",
      history,
    };
    const task = createUserTask(params, Context.Onboarding);

    expect(task.next().value).toEqual(
      call(sendAnonymous, `http://api.com/${ApiRoutes.UserCreate}`, {
        lastName: params.lastName,
        firstName: params.firstName,
        email: params.email,
        password: params.password,
      })
    );

    const apiResult = {
      success: false,
      error: "Something bad happened",
    };
    expect(() => task.next(apiResult as any).value).toThrow(apiResult.error);
    expect(task.next().done).toBe(true);
  });

  it("should return a generic error message if no error message was raised", () => {
    const history = createMemoryHistory();
    const params = {
      lastName: "Batman",
      firstName: "Thelad",
      email: "batman@batcave.cool",
      password: "robin",
      history,
    };
    const task = createUserTask(params, Context.Onboarding);

    expect(task.next().value).toEqual(
      call(sendAnonymous, `http://api.com/${ApiRoutes.UserCreate}`, {
        lastName: params.lastName,
        firstName: params.firstName,
        email: params.email,
        password: params.password,
      })
    );

    const apiResult = {
      success: false,
    };
    expect(() => task.next(apiResult as any).value).toThrow(
      "An error occured while creating your account"
    );
    expect(task.next().done).toBe(true);
  });

  it("should log the user if account creation succeeded", () => {
    const history = createMemoryHistory();
    const params = {
      lastName: "Batman",
      firstName: "Thelad",
      email: "batman@batcave.cool",
      password: "robin",
      history,
    };
    const task = createUserTask(params, Context.Global);

    expect(task.next().value).toEqual(
      call(sendAnonymous, `http://api.com/${ApiRoutes.UserCreate}`, {
        lastName: params.lastName,
        firstName: params.firstName,
        email: params.email,
        password: params.password,
      })
    );

    const apiResult = {
      success: true,
      payload: {
        status: CreateUserStatus.Created,
        user: {
          id: "23",
          lastName: params.lastName,
          firstName: params.firstName,
          email: params.email,
          avatarName: "",
        },
      },
    };
    expect(task.next(apiResult as any).value).toEqual(
      call(
        loginTask,
        {
          login: params.email,
          password: params.password,
          history: params.history,
        },
        Context.Global
      )
    );

    const last = task.next(apiResult.payload.user as any);
    expect(last.done).toBe(true);
    expect(last.value).toEqual(apiResult.payload);
  });
});
