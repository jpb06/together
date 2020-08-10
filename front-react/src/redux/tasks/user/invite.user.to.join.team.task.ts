import { put } from "redux-saga/effects";

import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { TerseUser } from "../../../types/shared";
import { successPayloadAction } from "../../actions";
import { apiCall } from "../../sagas";

export interface InviteUserToJoinTeamParams {
  teamId: string;
  email: string;
}

export function* inviteUserToJoinTeamTask(
  params: InviteUserToJoinTeamParams,
  context: Context
) {
  const user: TerseUser = yield apiCall(
    TogetherApi.Instance.post(ApiRoutes.UserInvite, params)
  );

  yield put(successPayloadAction(Type.InviteUserToTeam, context, user));

  return user;
}
