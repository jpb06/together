import { call, put } from "redux-saga/effects";

import { TeamWithLastActivity } from "../../../../../shared/types";
import { ApiRoutes } from "../../../api/calls/api.routes.enum";
import TogetherApi, { send } from "../../../api/setup/together.api";
import { ReduxActionType as Type } from "../../../types/redux";
import { payloadAction } from "../../actions";

export interface UserTeamsParams {
  userId: string;
  fetchLastActivity: boolean;
}

export interface UserTeamsResult {
  data?: Array<TeamWithLastActivity>;
}

export function* getUserTeams(params: UserTeamsParams) {
  const result: UserTeamsResult = yield call(
    send,
    TogetherApi.Instance.post(ApiRoutes.UserTimeline, params)
  );

  yield put(payloadAction(Type.GetUserTeamsSuccess, result.data));

  return result.data;
}
