import { call, put } from "redux-saga/effects";

import { TeamMember } from "../../../../../shared/types";
import { ApiRoutes } from "../../../api/calls/api.routes.enum";
import TogetherApi, { send } from "../../../api/setup/together.api";
import { ReduxActionType as Type } from "../../../types/redux";
import { payloadAction } from "../../actions";

export interface TeamMembersResult {
  data?: Array<TeamMember>;
}

export function* getTeamMembers(teamId: string) {
  const result: TeamMembersResult = yield call(
    send,
    TogetherApi.Instance.post(ApiRoutes.TeamMembers, { teamId })
  );

  yield put(payloadAction(Type.TeamMembersSuccess, result.data));

  return result.data;
}
