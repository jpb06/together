import * as localStore from "local-storage";
import { Action } from "redux";

import { BareTeam, TerseUser, User } from "../../../../../shared/types";
import LocalStorageKeys from "../../../logic/local.storage.keys";
import {
    AccountCreationState, AccountCreationStep, ActionWithPayload, ReduxActionModifiers as Modifier,
    ReduxActionType as Type
} from "../../../types/redux";
import { isSuccess } from "../../actions/generic/action.checks";
import { isAccountCreationAction } from "../../identifiers/account.creation.identifier";
import { initialState } from "../../store/root.state";

const accountCreationStateReducer = (
  state: AccountCreationState = initialState.accountCreationState,
  action: Action | ActionWithPayload<BareTeam>
) => {
  if (isSuccess(action.type, Type.Login)) {
    return {
      ...state,
      step: AccountCreationStep.Avatar,
      actionButtonText: "My teams",
      isLoading: false,
      isErrored: false,
    };
  }

  if (isSuccess(action.type, Type.CreateTeam)) {
    const team = (action as ActionWithPayload<BareTeam>).payload;
    localStore.set(LocalStorageKeys.currentTeam, team);
    const user = localStore.get<User | null>(LocalStorageKeys.user);

    return {
      ...state,
      step: AccountCreationStep.InviteUsersToTeam,
      isLoading: false,
      isErrored: false,
      newTeamMembers: user
        ? [
            {
              id: user.id,
              lastName: user.lastName,
              firstName: user.firstName,
              avatarName: user.avatarName,
              email: user.email,
              status: "Creator",
              joinDate: new Date().toISOString(),
            },
          ]
        : [],
    };
  }

  if (isSuccess(action.type, Type.RequestToJoinTeam)) {
    return {
      ...state,
      step: AccountCreationStep.Completed,
      isLoading: false,
      isErrored: false,
    };
  }

  if (isSuccess(action.type, Type.InviteUserToTeam)) {
    const user = (action as ActionWithPayload<TerseUser>).payload;

    return {
      ...state,
      isLoading: false,
      isErrored: false,
      exitActionText: "I'm done! Bring me to my timeline!",
      newTeamMembers: [
        ...state.newTeamMembers,
        { ...user, status: "Invite sent", joinDate: new Date().toISOString() },
      ],
    };
  }

  if ((action.type as string).startsWith(`${Type.Snackbar}-${Modifier.Saga}`)) {
    return {
      ...state,
      isLoading: false,
      isErrored: true,
    };
  }

  switch (action.type) {
    case Type.CreateUserDataSubmitted:
      return { ...state, isSubmitted: true };
    case isAccountCreationAction(action):
      return { ...state, isLoading: true, isErrored: false };
    case Type.AvatarChosen:
      return {
        ...state,
        step: AccountCreationStep.TeamChoice,
      };
  }

  return state;
};

export default accountCreationStateReducer;
