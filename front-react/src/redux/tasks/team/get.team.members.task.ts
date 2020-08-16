import { call, put } from "redux-saga/effects";

import { apiCallTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { TeamMember } from "../../../types/shared";
import { successPayloadAction } from "../../actions";

export interface GetTeamMembersResult {
  payload?: Array<TeamMember>;
}

export function* getTeamMembersTask(teamId: string, context: Context) {
  const teamMembers: Array<TeamMember> = yield call(
    apiCallTask,
    TogetherApi.Instance.post(ApiRoutes.TeamMembers, { teamId })
  );

  yield put(successPayloadAction(Type.TeamMembers, context, teamMembers));

  return teamMembers;
}
