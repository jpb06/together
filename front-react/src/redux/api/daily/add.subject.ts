import { call, put } from "redux-saga/effects";

import { NewSubject, Subject } from "../../../../../shared/types";
import { ApiRoutes } from "../../../api/calls/api.routes.enum";
import TogetherApi, { send } from "../../../api/setup/together.api";
import { ReduxActionType as Type } from "../../../types/redux";
import { payloadAction } from "../../actions";

export interface AddSubjectParams {
  teamId: string;
  date: string;
  subject: NewSubject;
}

export interface AddSubjectResult {
  data?: Subject;
}

export function* addSubject(params: AddSubjectParams) {
  const result: AddSubjectResult = yield call(
    send,
    TogetherApi.Instance.post(ApiRoutes.DailySubjectsAdd, params)
  );

  yield put(payloadAction(Type.AddSubjectSuccess, result.data));

  return result.data;
}
