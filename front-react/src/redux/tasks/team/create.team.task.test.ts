import { call, put } from "redux-saga/effects";

import { apiCallTask, createTeamTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";

const performTest = (context: Context) => {
  const teamName = "My great team";
  const task = createTeamTask(teamName, context);

  expect(task.next().value).toEqual(
    call(
      apiCallTask,
      TogetherApi.Instance.post(ApiRoutes.TeamCreate, { teamName })
    )
  );

  const newTeamMockData = { id: "326", name: teamName };
  expect(task.next("326" as any).value).toEqual(
    put(successPayloadAction(Type.CreateTeam, context, newTeamMockData))
  );

  expect(task.next().done).toBe(true);
};

describe("Team creation task", () => {
  it("should create a team", () => {
    performTest(Context.Global);
  });

  it("should stick to the context provided", () => {
    performTest(Context.Onboarding);
  });
});
