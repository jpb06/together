import { History, LocationState } from "history";
import { call, put } from "redux-saga/effects";

import { apiCallTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { TeamJoinRequest } from "../../../types/shared";
import { successPayloadAction } from "../../actions";

export interface RequestToJoinTeamParams {
  teamName: string;
  history: History<LocationState>;
}

export function* requestToJoinTeamTask(
  params: RequestToJoinTeamParams,
  context: Context
) {
  const request: TeamJoinRequest = yield call(
    apiCallTask,
    TogetherApi.Instance.post(ApiRoutes.UserRequestToJoinTeam, {
      teamName: params.teamName,
    })
  );

  yield put(successPayloadAction(Type.RequestToJoinTeam, context, request));

  params.history.push({
    pathname: "/main",
  });

  return request;
}
