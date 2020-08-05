import { put } from "redux-saga/effects";

import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { Feeling, NewFeeling } from "../../../types/shared";
import { successPayloadAction } from "../../actions";
import { apiCall } from "../../sagas";

export interface AddFeelingParams {
  teamId: string;
  date: string;
  feeling: NewFeeling;
}

export function* addFeelingTask(params: AddFeelingParams, context: Context) {
  const feeling: Feeling = yield apiCall(
    TogetherApi.Instance.post(ApiRoutes.DailyFeelingsAdd, params)
  );

  yield put(successPayloadAction(Type.AddFeeling, context, feeling));

  return feeling;
}
