import { call, put } from "redux-saga/effects";

import { apiCallTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";

export function* createTeamTask(teamName: string, context: Context) {
  const id: string = yield call(
    apiCallTask,
    TogetherApi.Instance.post(ApiRoutes.TeamCreate, { teamName })
  );

  const team = {
    id,
    name: teamName,
  };

  yield put(successPayloadAction(Type.CreateTeam, context, team));

  return team;
}
