import * as localStore from "local-storage";
import React from "react";
import { mocked } from "ts-jest/utils";

import { createMuiTheme } from "@material-ui/core";
import { logRoles, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { stringToColor } from "../../../logic/colors.util";
import {
  addComputedPropertiesToUser,
  getInitials,
} from "../../../logic/user.util";
import {
  createTeamAction,
  createUserAction,
  inviteUserToTeamAction,
  payloadAction,
  requestToJoinTeamAction,
  successPayloadAction,
} from "../../../redux/actions";
import { connectedRender } from "../../../redux/test-utils/connected.render.helper";
import {
  ReduxActionContext as Context,
  ReduxActionType as Type,
} from "../../../types/redux";
import NewAccountContainer from "./NewAccountContainer";

jest.mock("local-storage");

describe("New account container component", () => {
  const theme = createMuiTheme();
  const newUser = {
    lastName: "Yolo",
    firstName: "Bro",
    email: "yolo.bro@cool.org",
    password: "123",
    confirmPassword: "123",
  };
  const user = {
    lastName: "Yolo",
    firstName: "Bro",
    email: "yolo.bro@cool.org",
    avatarName: "",
    fullName: "Bro Yolo",
    initials: getInitials("Bro Yolo"),
    id: "23",
    teamInvites: [],
    teamJoinRequests: [],
    teams: [],
  };

  it("should contain a link to index", () => {
    connectedRender(<NewAccountContainer />);

    const mainLink = screen.getByRole("link", {
      name: /together/i,
    });
    expect(mainLink).toHaveAttribute("href", "/");
  });

  it("should welcome the guest", () => {
    connectedRender(<NewAccountContainer />);

    expect(screen.getByRole("heading")).toHaveTextContent("Welcome !");
  });

  it("should have an empty form on init", () => {
    connectedRender(<NewAccountContainer />);

    screen.getByText("Please tell us a little bit about yourself");
    const firstNameField = screen.getByRole("textbox", { name: "First name" });
    expect(firstNameField).toHaveValue("");
    const lastNameField = screen.getByRole("textbox", { name: "Last name" });
    expect(lastNameField).toHaveValue("");
    const emailField = screen.getByRole("textbox", { name: "Email address" });
    expect(emailField).toHaveValue("");

    screen.getByText("Time to choose a cool password !");
    const passwordField = screen.getByLabelText("password");
    expect(passwordField).toHaveValue("");
    const confirmPasswordField = screen.getByLabelText(/Confirm password/i);
    expect(confirmPasswordField).toHaveValue("");

    screen.getByText("Choose my avatar");
  });

  it("should only notify data has been submitted if form input is invalid", () => {
    const { store } = connectedRender(<NewAccountContainer />);

    const button = screen.getByText("Choose my avatar");
    userEvent.click(button);

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(
      payloadAction(Type.OnboardingFormSubmitted)
    );
  });

  it("should send a create user action", () => {
    const { store, history } = connectedRender(<NewAccountContainer />);

    userEvent.type(
      screen.getByRole("textbox", { name: "First name" }),
      newUser.firstName
    );
    userEvent.type(
      screen.getByRole("textbox", { name: "Last name" }),
      newUser.lastName
    );
    userEvent.type(
      screen.getByRole("textbox", { name: "Email address" }),
      newUser.email
    );

    userEvent.type(screen.getByLabelText("password"), newUser.password);
    userEvent.type(
      screen.getByLabelText(/Confirm password/i),
      newUser.password
    );

    const button = screen.getByText("Choose my avatar");
    userEvent.click(button);

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      1,
      payloadAction(Type.OnboardingFormSubmitted)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      2,
      createUserAction(newUser, history, Context.Onboarding)
    );
  });

  it("should display a loading indicator while creating the account", () => {
    const { store, history } = connectedRender(<NewAccountContainer />);
    store.dispatch(createUserAction(newUser, history, Context.Onboarding));

    screen.getByRole("progressbar", { name: "fat-progress" });
    screen.getByRole("img", { name: "busy-icon" });
    screen.getByText("Creating your account");

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
  });

  it("should display a default avatar and a next step button", () => {
    const { store } = connectedRender(<NewAccountContainer />);
    store.dispatch(
      successPayloadAction(
        Type.Login,
        Context.Onboarding,
        addComputedPropertiesToUser(user)
      )
    );

    expect(screen.getByRole("heading")).toHaveTextContent("Avatar selection");

    screen.getByText(
      "We have generated a default avatar for youYou will soon be able to customize it or use a picture instead!"
    );

    screen.getByRole("button", { name: /My teams/i });

    const avatar = screen.getByRole("img", { name: "user avatar" });
    const color = stringToColor(`${user.firstName} ${user.lastName}`);
    const contrastColor = theme.palette.getContrastText(color);
    expect(avatar).toHaveStyle(`background-color: ${color};`);
    expect(avatar).toHaveStyle(`color: ${contrastColor};`);
    expect(avatar).toHaveTextContent(user.initials);

    expect(avatar.parentNode?.nextSibling).toHaveTextContent(user.fullName);

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
  });

  it("should send an action to switch to the team step", async () => {
    const { store } = connectedRender(<NewAccountContainer />);
    store.dispatch(
      successPayloadAction(
        Type.Login,
        Context.Onboarding,
        addComputedPropertiesToUser(user)
      )
    );

    const myTeamButton = await screen.findByRole("button", {
      name: /My teams/i,
    });
    userEvent.click(myTeamButton);

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      2,
      payloadAction(Type.AvatarChosen)
    );
  });

  it("should display a choice to either join or create a team", () => {
    const { store } = connectedRender(<NewAccountContainer />);
    store.dispatch(
      successPayloadAction(
        Type.Login,
        Context.Onboarding,
        addComputedPropertiesToUser(user)
      )
    );
    store.dispatch(payloadAction(Type.AvatarChosen));

    expect(screen.getByRole("heading")).toHaveTextContent(
      "Let's get yourself a team"
    );

    screen.getByRole("button", { name: "create-team" });
    screen.getByRole("button", { name: "join-team" });

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
  });

  it("should display a form to create a team", () => {
    const { store } = connectedRender(<NewAccountContainer />);
    store.dispatch(
      successPayloadAction(
        Type.Login,
        Context.Onboarding,
        addComputedPropertiesToUser(user)
      )
    );
    store.dispatch(payloadAction(Type.AvatarChosen));

    const createTeamButton = screen.getByRole("button", {
      name: "create-team",
    });
    userEvent.click(createTeamButton);

    expect(screen.getByRole("heading")).toHaveTextContent("Create a team");

    screen.getByText("Choose a name for your new team");

    const teamNameField = screen.getByRole("textbox", { name: "Team name" });
    expect(teamNameField).toHaveValue("");

    screen.getByRole("button", { name: /Nevermind, let's join a team/i });
    screen.getByRole("button", { name: /left-icon Create/i });

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
  });

  it("should return to the team choice from create team", () => {
    const { store } = connectedRender(<NewAccountContainer />);
    store.dispatch(
      successPayloadAction(
        Type.Login,
        Context.Onboarding,
        addComputedPropertiesToUser(user)
      )
    );
    store.dispatch(payloadAction(Type.AvatarChosen));

    const createTeamButton = screen.getByRole("button", {
      name: "create-team",
    });
    userEvent.click(createTeamButton);

    const goBackButton = screen.getByRole("button", {
      name: /Nevermind, let's join a team/i,
    });
    userEvent.click(goBackButton);

    expect(screen.getByRole("heading")).toHaveTextContent(
      "Let's get yourself a team"
    );

    screen.getByRole("button", { name: "create-team" });
    screen.getByRole("button", { name: "join-team" });

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
  });

  it("should display a form to join a team", () => {
    const { store } = connectedRender(<NewAccountContainer />);
    store.dispatch(
      successPayloadAction(
        Type.Login,
        Context.Onboarding,
        addComputedPropertiesToUser(user)
      )
    );
    store.dispatch(payloadAction(Type.AvatarChosen));

    const joinTeamButton = screen.getByRole("button", {
      name: "join-team",
    });
    userEvent.click(joinTeamButton);

    expect(screen.getByRole("heading")).toHaveTextContent("Join a team");

    screen.getByText("Enter the name of the team you wish to join");

    const teamNameField = screen.getByRole("textbox", { name: "Team name" });
    expect(teamNameField).toHaveValue("");

    screen.getByRole("button", { name: /Nevermind, let's create a team/i });
    screen.getByRole("button", { name: /left-icon Request to join/i });

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
  });

  it("should return to the team choice from join team", () => {
    const { store } = connectedRender(<NewAccountContainer />);
    store.dispatch(
      successPayloadAction(
        Type.Login,
        Context.Onboarding,
        addComputedPropertiesToUser(user)
      )
    );
    store.dispatch(payloadAction(Type.AvatarChosen));

    const joinTeamButton = screen.getByRole("button", {
      name: "join-team",
    });
    userEvent.click(joinTeamButton);

    const goBackButton = screen.getByRole("button", {
      name: /Nevermind, let's create a team/i,
    });
    userEvent.click(goBackButton);

    expect(screen.getByRole("heading")).toHaveTextContent(
      "Let's get yourself a team"
    );

    screen.getByRole("button", { name: "create-team" });
    screen.getByRole("button", { name: "join-team" });

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
  });

  it("should not create a team if no name was provided", () => {
    const { store } = connectedRender(<NewAccountContainer />);
    store.dispatch(
      successPayloadAction(
        Type.Login,
        Context.Onboarding,
        addComputedPropertiesToUser(user)
      )
    );
    store.dispatch(payloadAction(Type.AvatarChosen));

    const goToCreateTeamButton = screen.getByRole("button", {
      name: "create-team",
    });
    userEvent.click(goToCreateTeamButton);

    const createTeamButton = screen.getByRole("button", {
      name: /left-icon Create/i,
    });
    userEvent.click(createTeamButton);

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      3,
      payloadAction(Type.OnboardingFormSubmitted)
    );
  });

  it("should send an action to create the team", async () => {
    const { store } = connectedRender(<NewAccountContainer />);
    store.dispatch(
      successPayloadAction(
        Type.Login,
        Context.Onboarding,
        addComputedPropertiesToUser(user)
      )
    );
    store.dispatch(payloadAction(Type.AvatarChosen));

    const goToCreateTeamButton = screen.getByRole("button", {
      name: "create-team",
    });
    userEvent.click(goToCreateTeamButton);

    const teamName = "Yolo";
    const teamNameField = screen.getByRole("textbox", { name: "Team name" });
    userEvent.type(teamNameField, teamName);

    const createTeamButton = screen.getByRole("button", {
      name: /left-icon Create/i,
    });
    userEvent.click(createTeamButton);

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(4);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      3,
      payloadAction(Type.OnboardingFormSubmitted)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      4,
      createTeamAction(teamName, Context.Onboarding)
    );

    await screen.findByRole("progressbar", { name: "fat-progress" });
    screen.getByRole("img", { name: "busy-icon" });
    screen.getByText(`Creating team ${teamName}`);
  });

  it("should send an action to join a team", () => {
    const { store, history } = connectedRender(<NewAccountContainer />);
    store.dispatch(
      successPayloadAction(
        Type.Login,
        Context.Onboarding,
        addComputedPropertiesToUser(user)
      )
    );
    store.dispatch(payloadAction(Type.AvatarChosen));

    const goToJoinTeamButton = screen.getByRole("button", {
      name: "join-team",
    });
    userEvent.click(goToJoinTeamButton);

    const teamName = "Yolo";
    const teamNameField = screen.getByRole("textbox", { name: "Team name" });
    userEvent.type(teamNameField, teamName);

    const joinTeamButton = screen.getByRole("button", {
      name: /left-icon Request to join/i,
    });
    userEvent.click(joinTeamButton);

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(4);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      3,
      payloadAction(Type.OnboardingFormSubmitted)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      4,
      requestToJoinTeamAction(teamName, history, Context.Onboarding)
    );

    screen.getByRole("progressbar", { name: "fat-progress" });
    screen.getByRole("img", { name: "busy-icon" });
    screen.getByText(`Sending membership request for team ${teamName}`);
  });

  it("should display a form to add team members to a new team", async () => {
    mocked(localStore.get).mockImplementationOnce(() => user);

    const { store } = connectedRender(<NewAccountContainer />);
    store.dispatch(
      successPayloadAction(
        Type.Login,
        Context.Onboarding,
        addComputedPropertiesToUser(user)
      )
    );
    store.dispatch(
      successPayloadAction(Type.CreateTeam, Context.Onboarding, {
        id: "23",
        name: "Yolo",
      })
    );

    await screen.findByText("Add members to your team");

    expect(screen.getAllByRole("img").length).toBe(2);

    const creatorAvatar = screen.getByRole("img", { name: user.fullName });
    const color = stringToColor(`${user.firstName} ${user.lastName}`);
    const contrastColor = theme.palette.getContrastText(color);
    expect(creatorAvatar).toHaveStyle(`background-color: ${color};`);
    expect(creatorAvatar).toHaveStyle(`color: ${contrastColor};`);
    expect(creatorAvatar).toHaveTextContent(user.initials);

    expect(creatorAvatar.parentNode?.nextSibling).toHaveTextContent(
      user.fullName
    );
    expect(
      creatorAvatar.parentNode?.nextSibling?.nextSibling
    ).toHaveTextContent("Creator");

    screen.getByRole("button", {
      name: /No thanks, bring me to my timeline!/i,
    });

    screen.getByRole("textbox", { name: /user email/i });
    screen.getByRole("button", { name: /left-icon Send invite/i });

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
  });

  it("should not send an action to invite another user if there is no input", async () => {
    const teamId = "23";

    mocked(localStore.get).mockImplementationOnce(() => user);

    const { store } = connectedRender(<NewAccountContainer />);
    store.dispatch(
      successPayloadAction(
        Type.Login,
        Context.Onboarding,
        addComputedPropertiesToUser(user)
      )
    );
    store.dispatch(
      successPayloadAction(Type.CreateTeam, Context.Onboarding, {
        id: teamId,
        name: "Yolo",
      })
    );

    await screen.findByText("Add members to your team");

    const emailField = screen.getByRole("textbox", { name: /user email/i });
    userEvent.type(emailField, "");
    const sendInviteButton = screen.getByRole("button", {
      name: /left-icon Send invite/i,
    });
    userEvent.click(sendInviteButton);

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      3,
      payloadAction(Type.OnboardingFormSubmitted)
    );
  });

  it("should send an action to invite another user", async () => {
    const teamId = "23";
    const email = "bat@man.org";

    mocked(localStore.get).mockImplementationOnce(() => user);

    const { store } = connectedRender(<NewAccountContainer />);
    store.dispatch(
      successPayloadAction(
        Type.Login,
        Context.Onboarding,
        addComputedPropertiesToUser(user)
      )
    );
    store.dispatch(
      successPayloadAction(Type.CreateTeam, Context.Onboarding, {
        id: teamId,
        name: "Yolo",
      })
    );

    await screen.findByText("Add members to your team");

    const emailField = screen.getByRole("textbox", { name: /user email/i });
    userEvent.type(emailField, email);
    const sendInviteButton = screen.getByRole("button", {
      name: /left-icon Send invite/i,
    });
    userEvent.click(sendInviteButton);

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(4);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      3,
      payloadAction(Type.OnboardingFormSubmitted)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      4,
      inviteUserToTeamAction(teamId, email, Context.Onboarding)
    );

    screen.getByRole("progressbar", { name: "fat-progress" });
    screen.getByRole("progressbar", { name: "circular-pending" });
  });

  it("should redirect to the timeline", async () => {
    mocked(localStore.get).mockImplementationOnce(() => user);

    const { store, history } = connectedRender(<NewAccountContainer />);
    store.dispatch(
      successPayloadAction(
        Type.Login,
        Context.Onboarding,
        addComputedPropertiesToUser(user)
      )
    );
    store.dispatch(
      successPayloadAction(Type.CreateTeam, Context.Onboarding, {
        id: "23",
        name: "Yolo",
      })
    );

    await screen.findByText("Add members to your team");

    const goToTimelineButton = screen.getByRole("button", {
      name: /No thanks, bring me to my timeline!/i,
    });
    userEvent.click(goToTimelineButton);

    expect(history.location.pathname).toBe("/main");

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      3,
      payloadAction(Type.OnboardingReset)
    );
  });
});
