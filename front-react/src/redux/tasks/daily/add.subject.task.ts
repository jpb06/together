import { put } from "redux-saga/effects";

import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { NewSubject, Subject } from "../../../types/shared";
import { successPayloadAction } from "../../actions";
import { apiCall } from "../../sagas";

export interface AddSubjectParams {
  teamId: string;
  date: string;
  subject: NewSubject;
}

export function* addSubjectTask(params: AddSubjectParams, context: Context) {
  const subject: Subject = yield apiCall(
    TogetherApi.Instance.post(ApiRoutes.DailySubjectsAdd, params)
  );

  yield put(successPayloadAction(Type.AddSubject, context, subject));

  return subject;
}
