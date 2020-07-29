import { call, put } from "redux-saga/effects";

import { ApiRoutes } from "../../../api/calls/api.routes.enum";
import TogetherApi, { send } from "../../../api/setup/together.api";
import { ReduxActionType as Type } from "../../../types/redux";
import { payloadAction } from "../../actions";

export interface CreateTeamResult {
  data?: string;
}

export function* createTeam(teamName: string) {
  const result: CreateTeamResult = yield call(
    send,
    TogetherApi.Instance.post(ApiRoutes.TeamCreate, { teamName })
  );

  const team = {
    id: result.data,
    name,
  };

  yield put(payloadAction(Type.CreateTeamSuccess, team));

  return team;
}
