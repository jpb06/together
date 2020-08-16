import { call, put } from "redux-saga/effects";

import { apiCallTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { Daily } from "../../../types/shared";
import { successPayloadAction } from "../../actions";

export interface GetDailyParams {
  teamId: string;
  date: string;
}

export function* getDailyTask(params: GetDailyParams, context: Context) {
  const daily: Daily = yield call(
    apiCallTask,
    TogetherApi.Instance.post(ApiRoutes.Daily, params)
  );

  yield put(successPayloadAction(Type.GetDaily, context, daily));

  return daily;
}
