import { put } from "redux-saga/effects";

import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";
import { apiCall } from "../../sagas";

export interface SetDailyDurationParams {
  teamId: string;
  date: string;
  duration: string;
}

export function* setDailyDurationTask(
  params: SetDailyDurationParams,
  context: Context
) {
  const message: string = yield apiCall(
    TogetherApi.Instance.post(ApiRoutes.DailySetDuration, params)
  );

  yield put(successPayloadAction(Type.DailyDuration, context, message));

  return message;
}
