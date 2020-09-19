import { call, put } from "redux-saga/effects";

import { apiCallTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { Feeling, NewFeeling } from "../../../stack-shared-code/types";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";

export interface AddFeelingParams {
  teamId: string;
  date: string;
  feeling: NewFeeling;
}

export function* addFeelingTask(params: AddFeelingParams, context: Context) {
  const feeling: Feeling = yield call(
    apiCallTask,
    TogetherApi.Instance.post(ApiRoutes.DailyFeelingsAdd, {
      teamId: params.teamId,
      date: params.date,
      type: params.feeling.type,
      comment: params.feeling.comment,
    })
  );

  yield put(successPayloadAction(Type.AddFeeling, context, feeling));

  return feeling;
}
