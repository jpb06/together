import { call, put } from "redux-saga/effects";

import { apiCallTask, getTeamMembersTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";

const performTest = (context: Context) => {
  const teamId = "456";
  const task = getTeamMembersTask(teamId, context);

  expect(task.next().value).toEqual(
    call(
      apiCallTask,
      TogetherApi.Instance.post(ApiRoutes.TeamMembers, { teamId })
    )
  );

  const teamMembersMockData = [{ member: "1" }, { member: "2" }];
  expect(task.next(teamMembersMockData as any).value).toEqual(
    put(successPayloadAction(Type.TeamMembers, context, teamMembersMockData))
  );

  expect(task.next().done).toBe(true);
};

describe("Get team members task", () => {
  it("should return the team members as an array if request succeeds", () => {
    performTest(Context.Global);
  });

  it("should stick to the context provided", () => {
    performTest(Context.Onboarding);
  });
});
