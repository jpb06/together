import { call, put } from "redux-saga/effects";

import { apiCallTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { TerseUser } from "../../../stack-shared-code/types";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";

export interface InviteUserToJoinTeamParams {
  teamId: string;
  email: string;
}

export function* inviteUserToJoinTeamTask(
  params: InviteUserToJoinTeamParams,
  context: Context
) {
  const user: TerseUser = yield call(
    apiCallTask,
    TogetherApi.Instance.post(ApiRoutes.UserInvite, params)
  );

  yield put(successPayloadAction(Type.InviteUserToTeam, context, user));

  return user;
}
