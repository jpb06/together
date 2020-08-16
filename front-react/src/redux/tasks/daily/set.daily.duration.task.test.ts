import { call, put } from "redux-saga/effects";

import { apiCallTask, setDailyDurationTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";

const performTest = (context: Context) => {
  const params = {
    teamId: "500",
    date: new Date().toISOString(),
    duration: "15 mins",
  };
  const task = setDailyDurationTask(params, context);

  expect(task.next().value).toEqual(
    call(
      apiCallTask,
      TogetherApi.Instance.post(ApiRoutes.DailySetDuration, params)
    )
  );

  const result = "Cool and good";
  expect(task.next(result as any).value).toEqual(
    put(successPayloadAction(Type.DailyDuration, context, result))
  );

  expect(task.next().done).toBe(true);
};

describe("Daily duration task", () => {
  it("should set the daily duration", () => {
    performTest(Context.Global);
  });

  it("should stick to the context provided", () => {
    performTest(Context.Onboarding);
  });
});
