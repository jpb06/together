import { call, put } from "redux-saga/effects";

import { TimeLine } from "../../../../../shared/types";
import { ApiRoutes } from "../../../api/calls/api.routes.enum";
import TogetherApi, { send } from "../../../api/setup/together.api";
import { ReduxActionType as Type } from "../../../types/redux";
import { payloadAction } from "../../actions";

export interface TimelineResult {
  data?: TimeLine;
}

export function* getTimeline(teamId: string) {
  const result: TimelineResult = yield call(
    send,
    TogetherApi.Instance.post(ApiRoutes.UserTimeline, { teamId })
  );

  yield put(payloadAction(Type.GetTimelineSuccess, result.data));

  return result.data;
}
