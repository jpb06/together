import { call, put } from "redux-saga/effects";

import { TerseUser } from "../../../../../shared/types";
import { ApiRoutes } from "../../../api/calls/api.routes.enum";
import TogetherApi, { send } from "../../../api/setup/together.api";
import { ReduxActionType as Type } from "../../../types/redux";
import { payloadAction } from "../../actions";

export interface InviteUserParams {
  teamId: string;
  email: string;
}

interface InviteUserResult {
  data?: TerseUser;
}

export function* inviteUserToTeam(params: InviteUserParams) {
  const result: InviteUserResult = yield call(
    send,
    TogetherApi.Instance.post(ApiRoutes.UserInvite, params)
  );

  yield put(payloadAction(Type.InviteUserSuccess, result.data));

  return result.data;
}
