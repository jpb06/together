import { Action } from "redux";

import { ReduxActionContext as Context, ReduxActionType as Type } from "../../types/redux";
import { isSaga } from "./generic.actions.identifiers";

export const isAccountCreationAction = (action: Action) =>
  isSaga(action.type, Type.CreateUser) ||
  isSaga(action.type, Type.CreateTeam) ||
  (isSaga(action.type, Type.InviteUserToTeam) &&
    action.type.endsWith(`_${Context.Onboarding}`)) ||
  (isSaga(action.type, Type.RequestToJoinTeam) &&
    action.type.endsWith(`_${Context.Onboarding}`));
