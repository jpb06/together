import * as localStore from "local-storage";
import { Action } from "redux";

import LocalStorageKeys from "../../../logic/local.storage.keys";
import {
    AccountCreationState, AccountCreationStep, ActionWithPayload, ReduxActionContext as Context,
    ReduxActionType as Type
} from "../../../types/redux";
import { BareTeam, TerseUser, User } from "../../../types/shared";
import { isSagaFor, isSuccessFor } from "../../identifiers/generic.actions.identifiers";
import { isAccountCreationAction } from "../../identifiers/onboarding.actions.identifier";
import { initialState } from "../../store/root.state";

const accountCreationStateReducer = (
  state: AccountCreationState = initialState.accountCreationState,
  action: Action | ActionWithPayload<BareTeam>
) => {
  if (isSuccessFor(Type.Login, action.type, Context.Onboarding)) {
    return {
      ...state,
      step: AccountCreationStep.Avatar,
      actionButtonText: "My teams",
      isLoading: false,
      isErrored: false,
    };
  }

  if (isSuccessFor(Type.CreateTeam, action.type)) {
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

  if (isSuccessFor(Type.RequestToJoinTeam, action.type)) {
    return {
      ...state,
      step: AccountCreationStep.Completed,
      isLoading: false,
      isErrored: false,
    };
  }

  if (isSuccessFor(Type.InviteUserToTeam, action.type)) {
    const user = (action as ActionWithPayload<TerseUser>).payload;
    console.log(action);

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

  if (isSagaFor(Type.Snackbar, action.type)) {
    return {
      ...state,
      isLoading: false,
      isErrored: true,
    };
  }

  if (isAccountCreationAction(action)) {
    return { ...state, isLoading: true, isErrored: false };
  }

  switch (action.type) {
    case Type.CreateUserDataSubmitted:
      return { ...state, isSubmitted: true };
    case Type.AvatarChosen:
      return {
        ...state,
        step: AccountCreationStep.TeamChoice,
      };
  }

  return state;
};

export default accountCreationStateReducer;
