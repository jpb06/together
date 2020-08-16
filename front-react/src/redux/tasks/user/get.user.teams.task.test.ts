import { call, put } from "redux-saga/effects";

import { apiCallTask, getUserTeamsTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";

const performTest = (context: Context) => {
  const params = { userId: "23", fetchLastActivity: false };
  const task = getUserTeamsTask(params, context);

  expect(task.next().value).toEqual(
    call(apiCallTask, TogetherApi.Instance.post(ApiRoutes.UserTeams, params))
  );

  const teamsMockData = [{ team: "1" }, { team: "2" }];
  expect(task.next(teamsMockData as any).value).toEqual(
    put(successPayloadAction(Type.GetUserTeams, context, teamsMockData))
  );

  expect(task.next().done).toBe(true);
};

describe("Get user teams task", () => {
  it("should return the user teams as an array if request succeeds", () => {
    performTest(Context.Global);
  });

  it("should stick to the context provided", () => {
    performTest(Context.Onboarding);
  });
});
