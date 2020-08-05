import { put } from "redux-saga/effects";

import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { Daily } from "../../../types/shared";
import { successPayloadAction } from "../../actions";
import { apiCall } from "../../sagas";

export interface GetDailyParams {
  teamId: string;
  date: string;
}

export function* getDailyTask(params: GetDailyParams, context: Context) {
  const daily: Daily = yield apiCall(
    TogetherApi.Instance.post(ApiRoutes.Daily, params)
  );

  yield put(successPayloadAction(Type.GetDaily, context, daily));

  return daily;
}