import { call, put } from "redux-saga/effects";

import { apiCallTask, getTimelineTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";

const performTest = (context: Context) => {
  const teamId = "456";
  const task = getTimelineTask(teamId, context);

  expect(task.next().value).toEqual(
    call(
      apiCallTask,
      TogetherApi.Instance.post(ApiRoutes.UserTimeline, { teamId })
    )
  );

  const timelineMockData = [{ entry: "a" }, { entry: "b" }];
  expect(task.next(timelineMockData as any).value).toEqual(
    put(successPayloadAction(Type.GetTimeline, context, timelineMockData))
  );

  expect(task.next().done).toBe(true);
};

describe("Timeline fetching task", () => {
  it("should return the user timeline if request succeeds", () => {
    performTest(Context.Global);
  });

  it("should stick to the context provided", () => {
    performTest(Context.Onboarding);
  });
});
