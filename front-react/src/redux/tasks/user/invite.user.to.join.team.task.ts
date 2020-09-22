import { call, put } from "redux-saga/effects";

import { apiCallTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { TerseUser } from "../../../stack-shared-code/types";
import {
    ReduxActionContext as Context, ReduxActionType as Type, SnackbarKind
} from "../../../types/redux";
import { showSnackbarAction, successPayloadAction } from "../../actions";

export interface InviteUserToJoinTeamParams {
  teamId: string;
  email: string;
}

export interface InviteUserToTeamResult {
  teamId: string;
  user: TerseUser;
}

export function* inviteUserToJoinTeamTask(
  params: InviteUserToJoinTeamParams,
  context: Context
) {
  const user: TerseUser = yield call(
    apiCallTask,
    TogetherApi.Instance.post(ApiRoutes.UserInvite, params)
  );

  yield put(
    successPayloadAction<InviteUserToTeamResult>(
      Type.InviteUserToTeam,
      context,
      { teamId: params.teamId, user }
    )
  );
  yield put(
    showSnackbarAction(
      `${user.firstName} ${user.lastName} has been invited to join your team.`,
      SnackbarKind.Success
    )
  );

  return user;
}
