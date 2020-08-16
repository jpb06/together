import { call, put } from "redux-saga/effects";

import { apiCallTask, inviteUserToJoinTeamTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";

const performTest = (context: Context) => {
  const params = { teamId: "23", email: "yolo@bro.com" };
  const task = inviteUserToJoinTeamTask(params, context);

  expect(task.next().value).toEqual(
    call(apiCallTask, TogetherApi.Instance.post(ApiRoutes.UserInvite, params))
  );

  const user = {
    id: "54",
    lastName: "McBro",
    firstName: "Yoloman",
    avatarName: "cool.png",
    email: "mcbro.yolo@cool.org",
  };
  expect(task.next(user as any).value).toEqual(
    put(successPayloadAction(Type.InviteUserToTeam, context, user))
  );

  expect(task.next().done).toBe(true);
};

describe("Invite user to join team task", () => {
  it("should return the invited user if request succeeds", () => {
    performTest(Context.Global);
  });

  it("should stick to the context provided", () => {
    performTest(Context.Modal);
  });
});
