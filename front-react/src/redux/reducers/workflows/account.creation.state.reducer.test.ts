import * as localStore from "local-storage";

import LocalStorageKeys from "../../../logic/local.storage.keys";
import {
    AccountCreationStep, ReduxActionContext as Context, ReduxActionType as Type
} from "../../../types/redux";
import { payloadAction, sagaPayloadAction, successPayloadAction } from "../../actions";
import { initialState } from "../../store/root.state";
import accountCreationStateReducer from "./account.creation.state.reducer";

describe("Account creation state reducer", () => {
  it("should initialize properly", () => {
    const reducer = accountCreationStateReducer(
      undefined,
      payloadAction("Init" as Type)
    );

    expect(reducer).toStrictEqual(initialState.accountCreationState);
  });

  it("should update its state following a successful login", () => {
    const reducer = accountCreationStateReducer(
      initialState.accountCreationState,
      successPayloadAction(Type.Login, Context.Onboarding)
    );

    expect(reducer).toStrictEqual({
      ...initialState.accountCreationState,
      step: AccountCreationStep.Avatar,
      actionButtonText: "My teams",
      isLoading: false,
      isErrored: false,
    });
  });

  it("should update its state following a successful team creation", () => {
    const reducer = accountCreationStateReducer(
      initialState.accountCreationState,
      successPayloadAction(Type.CreateTeam, Context.Onboarding)
    );
    localStore.set(LocalStorageKeys.user, null);

    expect(reducer).toStrictEqual({
      ...initialState.accountCreationState,
      step: AccountCreationStep.InviteUsersToTeam,
      isLoading: false,
      isErrored: false,
      newTeamMembers: [],
    });
  });

  it("should set current user as creator following a successful team creation, if user is set in localstorage", () => {
    const user = {
      id: "22",
      lastName: "Yolo",
      firstName: "Bro",
      avatarName: "yolo.gif",
      email: "yolo@bro.com",
    };

    localStore.set(LocalStorageKeys.user, user);
    const reducer = accountCreationStateReducer(
      initialState.accountCreationState,
      successPayloadAction(Type.CreateTeam, Context.Onboarding)
    );

    expect(reducer.isLoading).toBe(false);
    expect(reducer.isErrored).toBe(false);
    expect(reducer.step).toBe(AccountCreationStep.InviteUsersToTeam);
    expect(reducer.newTeamMembers.length).toBe(1);
    expect(reducer.newTeamMembers[0].id).toBe(user.id);
    expect(reducer.newTeamMembers[0].lastName).toBe(user.lastName);
    expect(reducer.newTeamMembers[0].firstName).toBe(user.firstName);
    expect(reducer.newTeamMembers[0].avatarName).toBe(user.avatarName);
    expect(reducer.newTeamMembers[0].email).toBe(user.email);
    expect(reducer.newTeamMembers[0].status).toBe("Creator");
  });

  it("should update its state following a successful request to join a team", () => {
    const reducer = accountCreationStateReducer(
      initialState.accountCreationState,
      successPayloadAction(Type.RequestToJoinTeam, Context.Onboarding)
    );

    expect(reducer).toStrictEqual({
      ...initialState.accountCreationState,
      step: AccountCreationStep.Completed,
      isLoading: false,
      isErrored: false,
    });
  });

  it("should update its state following a successful invitation to join the new user's team", () => {
    const invitedUser = {
      id: "22",
      lastName: "Yolo",
      firstName: "Bro",
      avatarName: "yolo.gif",
      email: "yolo@bro.com",
    };
    const reducer = accountCreationStateReducer(
      initialState.accountCreationState,
      successPayloadAction(
        Type.InviteUserToTeam,
        Context.Onboarding,
        invitedUser
      )
    );

    expect(reducer.isLoading).toBe(false);
    expect(reducer.isErrored).toBe(false);
    expect(reducer.exitActionText).toBe("I'm done! Bring me to my timeline!");
    expect(reducer.newTeamMembers.length).toBe(1);
    expect(reducer.newTeamMembers[0].id).toBe(invitedUser.id);
    expect(reducer.newTeamMembers[0].lastName).toBe(invitedUser.lastName);
    expect(reducer.newTeamMembers[0].firstName).toBe(invitedUser.firstName);
    expect(reducer.newTeamMembers[0].avatarName).toBe(invitedUser.avatarName);
    expect(reducer.newTeamMembers[0].email).toBe(invitedUser.email);
    expect(reducer.newTeamMembers[0].status).toBe("Invite sent");
  });

  it("should set its state to errored when a snackbar is to be displayed", () => {
    const reducer = accountCreationStateReducer(
      initialState.accountCreationState,
      sagaPayloadAction(Type.Snackbar, Context.Onboarding)
    );

    expect(reducer).toStrictEqual({
      ...initialState.accountCreationState,
      isLoading: false,
      isErrored: true,
    });
  });

  it("should set its state to loading when an onboarding action that is not a success is dispatched", () => {
    const reducer = accountCreationStateReducer(
      initialState.accountCreationState,
      sagaPayloadAction(Type.RemoveDoneTicket, Context.Onboarding)
    );

    expect(reducer).toStrictEqual({
      ...initialState.accountCreationState,
      isLoading: true,
      isErrored: false,
    });
  });

  it("should set its state to submitted", () => {
    const reducer = accountCreationStateReducer(
      initialState.accountCreationState,
      payloadAction(Type.CreateUserDataSubmitted)
    );

    expect(reducer).toStrictEqual({
      ...initialState.accountCreationState,
      isSubmitted: true,
    });
  });

  it("should switch to team choice one avatar step is complete", () => {
    const reducer = accountCreationStateReducer(
      initialState.accountCreationState,
      payloadAction(Type.AvatarChosen)
    );

    expect(reducer).toStrictEqual({
      ...initialState.accountCreationState,
      step: AccountCreationStep.TeamChoice,
    });
  });
});
