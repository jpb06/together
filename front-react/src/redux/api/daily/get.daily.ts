import { call, put } from "redux-saga/effects";

import { Daily } from "../../../../../shared/types";
import { ApiRoutes } from "../../../api/calls/api.routes.enum";
import TogetherApi, { send } from "../../../api/setup/together.api";
import { ReduxActionType as Type } from "../../../types/redux";
import { payloadAction } from "../../actions";

export interface DailyParams {
  teamId: string;
  date: string;
}

export interface DailyResult {
  data?: Daily;
}

export function* getDaily(params: DailyParams) {
  const result: DailyResult = yield call(
    send,
    TogetherApi.Instance.post(ApiRoutes.Daily, params)
  );

  yield put(payloadAction(Type.GetDailySuccess, result.data));

  return result.data;
}
