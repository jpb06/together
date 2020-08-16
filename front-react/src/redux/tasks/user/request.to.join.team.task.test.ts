import { createMemoryHistory } from "history";
import { call, put } from "redux-saga/effects";

import { apiCallTask, requestToJoinTeamTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";

const performTest = (context: Context) => {
  const history = createMemoryHistory();
  const task = requestToJoinTeamTask(
    { teamName: "The cool team", history },
    context
  );

  expect(task.next().value).toEqual(
    call(
      apiCallTask,
      TogetherApi.Instance.post(ApiRoutes.UserRequestToJoinTeam, {
        teamName: "The cool team",
      })
    )
  );

  const request = {
    id: "23",
    date: new Date().toISOString(),
    team: {
      id: "65",
      name: "The cool team",
    },
  };
  expect(task.next(request as any).value).toEqual(
    put(successPayloadAction(Type.RequestToJoinTeam, context, request))
  );

  expect(history.length).toBe(1);
  expect(history.location.pathname).toBe("/");
  expect(task.next().done).toBe(true);
  expect(history.length).toBe(2);
  expect(history.location.pathname).toBe("/main");
};

describe("Request to join team task", () => {
  it("should return the join request if succeeded", () => {
    performTest(Context.Global);
  });

  it("should stick to the context provided", () => {
    performTest(Context.Onboarding);
  });
});
