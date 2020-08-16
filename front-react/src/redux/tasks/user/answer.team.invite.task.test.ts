import { call, put, select } from "redux-saga/effects";

import { answerTeamInviteTask, apiCallTask, getUserTeamsTask, TeamInviteAnswer } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";
import { userSelector } from "../../selectors";

const performTest = (
  answer: TeamInviteAnswer,
  refreshCallerTeams: boolean,
  userExists: boolean,
  context: Context
) => {
  const params = {
    inviteId: "534543",
    answer,
    refreshCallerTeams,
  };
  const task = answerTeamInviteTask(params, context);

  expect(task.next().value).toEqual(
    call(
      apiCallTask,
      TogetherApi.Instance.post(
        answer === TeamInviteAnswer.Accepted
          ? ApiRoutes.UserAcceptTeamInvite
          : ApiRoutes.UserDeclineTeamInvite,
        { inviteId: params.inviteId }
      )
    )
  );

  const resultMockData = "Yolo";
  expect(task.next(resultMockData as any).value).toEqual(
    put(successPayloadAction(Type.AnswerTeamInvite, context, resultMockData))
  );

  if (refreshCallerTeams) {
    expect(task.next().value).toEqual(select(userSelector));
    if (userExists) {
      const user = { id: "23" };
      expect(task.next(user as any).value).toEqual(
        call(
          getUserTeamsTask,
          { userId: user.id, fetchLastActivity: true },
          context
        )
      );
    }
  }

  expect(task.next().done).toBe(true);
};

describe("Answer team invite task", () => {
  it("should accept the invite", () => {
    performTest(TeamInviteAnswer.Accepted, false, true, Context.Global);
  });

  it("should decline the invite", () => {
    performTest(TeamInviteAnswer.Declined, false, true, Context.Onboarding);
  });

  it("should refresh caller teams", () => {
    performTest(TeamInviteAnswer.Accepted, true, true, Context.Onboarding);
  });

  it("shouldn't perform the getUserTeams task if user does not exist", () => {
    performTest(TeamInviteAnswer.Accepted, true, false, Context.Onboarding);
  });
});
