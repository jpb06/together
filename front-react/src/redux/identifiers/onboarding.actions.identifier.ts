import { Action } from "redux";

import { ReduxActionContext as Context, ReduxActionType as Type } from "../../types/redux";
import { isSagaFor } from "./generic.actions.identifiers";

export const isAccountCreationAction = (action: Action) =>
  isSagaFor(Type.CreateUser, action.type) ||
  isSagaFor(Type.CreateTeam, action.type) ||
  (isSagaFor(Type.InviteUserToTeam, action.type) &&
    action.type.endsWith(`_${Context.Onboarding}`)) ||
  (isSagaFor(Type.RequestToJoinTeam, action.type) &&
    action.type.endsWith(`_${Context.Onboarding}`));
