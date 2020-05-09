import { initialState } from "../../store/root.state";
import {
  AccountCreationState,
  AccountCreationStep,
} from "../../types/account.creation.state.type";
import {
  CREATE_USER_DATA_SUBMITTED,
  AVATAR_CHOSEN,
  Context,
  Type,
  Result,
} from "../../types/action.types";
import { Action } from "redux";
import * as localStorage from "local-storage";
import LocalStorageKeys from "../../../logic/local.storage.keys";
import BareTeam from "../../../types/team.type";
import { ActionWithPayload } from "../../types/action.payloads";
import {
  beginApiCallFor,
  typeFor,
} from "../../logic/action-types/redux.action.type.generation";

const accountCreationStateReducer = (
  state: AccountCreationState = initialState.accountCreationState,
  action: Action | ActionWithPayload<string, BareTeam>
) => {
  switch (action.type) {
    case CREATE_USER_DATA_SUBMITTED:
      return { ...state, isSubmitted: true };
    case beginApiCallFor(Context.AccountCreation):
      return { ...state, isLoading: true, isErrored: false };
    case typeFor(Type.login, Context.Global, Result.Success):
      return {
        ...state,
        step: AccountCreationStep.Avatar,
        actionButtonText: "My teams",
        isLoading: false,
        isErrored: false,
      };
    case AVATAR_CHOSEN:
      return {
        ...state,
        step: AccountCreationStep.TeamChoice,
      };
    case typeFor(Type.createTeam, Context.AccountCreation, Result.Success):
      const team = (action as ActionWithPayload<string, BareTeam>).payload;
      localStorage.set(LocalStorageKeys.currentTeam, team);

      return {
        ...state,
        step: AccountCreationStep.InviteUsersToTeam,
        isLoading: false,
        isErrored: false,
      };
    case typeFor(
      Type.requestToJoinTeam,
      Context.AccountCreation,
      Result.Success
    ):
      return {
        ...state,
        step: AccountCreationStep.Completed,
        isLoading: false,
        isErrored: false,
      };
    case typeFor(Type.inviteUser, Context.AccountCreation, Result.Success):
      return {
        ...state,
        isLoading: false,
        isErrored: false,
      };
    case typeFor(Type.createUser, Context.AccountCreation, Result.Failure):
    case typeFor(Type.createTeam, Context.AccountCreation, Result.Failure):
    case typeFor(Type.inviteUser, Context.AccountCreation, Result.Failure):
    case typeFor(
      Type.requestToJoinTeam,
      Context.AccountCreation,
      Result.Failure
    ):
    case typeFor(Type.login, Context.Global, Result.Failure):
      return {
        ...state,
        isLoading: false,
        isErrored: true,
      };
  }

  return state;
};

export default accountCreationStateReducer;
