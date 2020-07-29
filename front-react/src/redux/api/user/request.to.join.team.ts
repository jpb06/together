import { call, put } from "redux-saga/effects";

import { TeamJoinRequest } from "../../../../../shared/types";
import { ApiRoutes } from "../../../api/calls/api.routes.enum";
import TogetherApi, { send } from "../../../api/setup/together.api";
import { ReduxActionType as Type } from "../../../types/redux";
import { payloadAction } from "../../actions";

export interface RequestToJoinTeamResult {
  data?: TeamJoinRequest;
}

export function* requestToJoinTeam(teamName: string) {
  const result: RequestToJoinTeamResult = yield call(
    send,
    TogetherApi.Instance.post(ApiRoutes.UserRequestToJoinTeam, { teamName })
  );

  yield put(payloadAction(Type.RequestToJoinTeamSuccess, result.data));

  return result.data;
}
