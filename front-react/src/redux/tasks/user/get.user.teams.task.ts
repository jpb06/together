import { call, put } from "redux-saga/effects";

import { apiCallTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { TeamWithLastActivity } from "../../../types/shared";
import { successPayloadAction } from "../../actions";

export interface GetUserTeamsParams {
  userId: string;
  fetchLastActivity: boolean;
}

export function* getUserTeamsTask(
  params: GetUserTeamsParams,
  context: Context
) {
  const teams: Array<TeamWithLastActivity> = yield call(
    apiCallTask,
    TogetherApi.Instance.post(ApiRoutes.UserTeams, params)
  );

  yield put(successPayloadAction(Type.GetUserTeams, context, teams));

  return teams;
}
