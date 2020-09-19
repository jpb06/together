import { call, put, select } from "redux-saga/effects";

import { apiCallTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { User } from "../../../stack-shared-code/types";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";
import { userSelector } from "../../selectors";
import { getUserTeamsTask } from "./get.user.teams.task";

export enum TeamInviteAnswer {
  Accepted,
  Declined,
}

export interface AnswerTeamInviteParams {
  inviteId: string;
  answer: TeamInviteAnswer;
  refreshCallerTeams: boolean;
}

export function* answerTeamInviteTask(
  params: AnswerTeamInviteParams,
  context: Context
) {
  const route =
    params.answer === TeamInviteAnswer.Accepted
      ? ApiRoutes.UserAcceptTeamInvite
      : ApiRoutes.UserDeclineTeamInvite;

  const result: string = yield call(
    apiCallTask,
    TogetherApi.Instance.post(route, { inviteId: params.inviteId })
  );

  yield put(successPayloadAction(Type.AnswerTeamInvite, context, result));

  if (params.refreshCallerTeams) {
    const user: User | null = yield select(userSelector);
    if (user) {
      yield call(
        getUserTeamsTask,
        { userId: user.id, fetchLastActivity: true },
        context
      );
    }
  }

  return result;
}
