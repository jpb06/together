import { call, put } from "redux-saga/effects";

import { apiCallTask, getDailyTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";

const performTest = (context: Context) => {
  const params = {
    teamId: "500",
    date: new Date().toISOString(),
  };
  const task = getDailyTask(params, context);

  expect(task.next().value).toEqual(
    call(apiCallTask, TogetherApi.Instance.post(ApiRoutes.Daily, params))
  );

  const dailyMockData = {
    daily: "Something...",
  };
  expect(task.next(dailyMockData as any).value).toEqual(
    put(successPayloadAction(Type.GetDaily, context, dailyMockData))
  );

  expect(task.next().done).toBe(true);
};

describe("Daily fetching task", () => {
  it("should get the daily", () => {
    performTest(Context.Global);
  });

  it("should stick to the context provided", () => {
    performTest(Context.Onboarding);
  });
});
