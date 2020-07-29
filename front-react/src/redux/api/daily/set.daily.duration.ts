import { call, put } from "redux-saga/effects";

import { ApiRoutes } from "../../../api/calls/api.routes.enum";
import TogetherApi, { send } from "../../../api/setup/together.api";
import { ReduxActionType as Type } from "../../../types/redux";
import { payloadAction } from "../../actions";

export interface DailyDurationParams {
  teamId: string;
  date: string;
  duration: string;
}

export interface DailyDurationResult {
  data?: string;
}

export function* setDailyDuration(params: DailyDurationParams) {
  const result: DailyDurationResult = yield call(
    send,
    TogetherApi.Instance.post(ApiRoutes.DailySetDuration, params)
  );

  yield put(payloadAction(Type.DailyDurationSuccess, result.data));

  return result.data;
}
