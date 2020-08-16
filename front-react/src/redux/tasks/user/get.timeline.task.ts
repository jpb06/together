import { call, put } from "redux-saga/effects";

import { apiCallTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { TimeLine } from "../../../types/shared";
import { successPayloadAction } from "../../actions";

export interface GetTimelineResult {
  payload?: TimeLine;
}

export function* getTimelineTask(teamId: string, context: Context) {
  const timeline: TimeLine = yield call(
    apiCallTask,
    TogetherApi.Instance.post(ApiRoutes.UserTimeline, { teamId })
  );

  yield put(successPayloadAction(Type.GetTimeline, context, timeline));

  return timeline;
}
