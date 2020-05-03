import { initialState } from "../../store/root.state";
import {
  AccountCreationState,
  AccountCreationStep,
} from "../../types/account.creation.state.type";
import {
  BEGIN_API_CALL_ACCOUNT_CREATION,
  LOGIN_SUCCESS,
  CREATE_USER_FAILURE_ISOLATED,
  CREATE_USER_DATA_SUBMITTED,
  LOGIN_FAILURE,
  CREATE_TEAM_SUCCESS_ISOLATED,
  CREATE_TEAM_FAILURE_ISOLATED,
  AVATAR_CHOSEN,
  REQUEST_TO_JOIN_TEAM_SUCCESS_ISOLATED,
  INVITE_USER_FAILURE_ISOLATED,
  INVITE_USER_SUCCESS_ISOLATED,
  REQUEST_TO_JOIN_TEAM_FAILURE_ISOLATED,
} from "../../actions/util/action.types";
import { Action } from "redux";
import * as localStorage from "local-storage";
import LocalStorageKeys from "../../../logic/local.storage.keys";
import { ActionWithPayload } from "../../actions/util/generic.actions";
import BareTeam from "../../../types/team.type";

const accountCreationStateReducer = (
  state: AccountCreationState = initialState.accountCreationState,
  action: Action | ActionWithPayload<string, BareTeam>
) => {
  switch (action.type) {
    case CREATE_USER_DATA_SUBMITTED:
      return { ...state, isSubmitted: true };
    case BEGIN_API_CALL_ACCOUNT_CREATION:
      return { ...state, isLoading: true, isErrored: false };
    case LOGIN_SUCCESS:
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
    case CREATE_TEAM_SUCCESS_ISOLATED:
      const team = (action as ActionWithPayload<string, BareTeam>).payload;
      localStorage.set(LocalStorageKeys.currentTeam, team);

      return {
        ...state,
        step: AccountCreationStep.InviteUsersToTeam,
        isLoading: false,
        isErrored: false,
      };
    case REQUEST_TO_JOIN_TEAM_SUCCESS_ISOLATED:
      return {
        ...state,
        step: AccountCreationStep.Completed,
        isLoading: false,
        isErrored: false,
      };
    case INVITE_USER_SUCCESS_ISOLATED:
      return {
        ...state,
        isLoading: false,
        isErrored: false,
      };
    case CREATE_USER_FAILURE_ISOLATED:
    case CREATE_TEAM_FAILURE_ISOLATED:
    case INVITE_USER_FAILURE_ISOLATED:
    case REQUEST_TO_JOIN_TEAM_FAILURE_ISOLATED:
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isErrored: true,
      };
  }

  return state;
};

export default accountCreationStateReducer;
