import { call, put } from "redux-saga/effects";

import { Feeling, NewFeeling } from "../../../../../shared/types";
import { ApiRoutes } from "../../../api/calls/api.routes.enum";
import TogetherApi, { send } from "../../../api/setup/together.api";
import { ReduxActionType as Type } from "../../../types/redux";
import { payloadAction } from "../../actions";

export interface AddFeelingParams {
  teamId: string;
  date: string;
  feeling: NewFeeling;
}

export interface AddFeelingResult {
  data?: Feeling;
}

export function* addFeeling(params: AddFeelingParams) {
  const result: AddFeelingResult = yield call(
    send,
    TogetherApi.Instance.post(ApiRoutes.DailyFeelingsAdd, params)
  );

  yield put(payloadAction(Type.AddFeelingSuccess, result.data));

  return result.data;
}
