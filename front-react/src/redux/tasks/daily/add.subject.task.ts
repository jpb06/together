import { call, put } from "redux-saga/effects";

import { apiCallTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { NewSubject, Subject } from "../../../types/shared";
import { successPayloadAction } from "../../actions";

export interface AddSubjectParams {
  teamId: string;
  date: string;
  subject: NewSubject;
}

export function* addSubjectTask(params: AddSubjectParams, context: Context) {
  const subject: Subject = yield call(
    apiCallTask,
    TogetherApi.Instance.post(ApiRoutes.DailySubjectsAdd, {
      teamId: params.teamId,
      date: params.date,
      type: params.subject.type,
      description: params.subject.description,
    })
  );

  yield put(successPayloadAction(Type.AddSubject, context, subject));

  return subject;
}
