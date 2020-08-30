import * as localStore from "local-storage";
import React from "react";
import { mocked } from "ts-jest/utils";

import { logRoles, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  addComputedPropertiesToUser,
  getInitials,
} from "../../logic/user.util";
import {
  loginAction,
  payloadAction,
  sagaPayloadAction,
  successPayloadAction,
} from "../../redux/actions";
import { connectedRender } from "../../redux/test-utils/connected.render.helper";
import {
  ReduxActionContext as Context,
  ReduxActionType as Type,
} from "../../types/redux";
import LoggedInRootContainer from "./LoggedInRootContainer";

jest.mock("local-storage");

interface ChildProps {
  text: string;
}
const Child: React.FC<ChildProps> = ({ text }) => <h1>{text}</h1>;

describe("Logged in root container component", () => {
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

  it("should display a link to application root", () => {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 20);

    mocked(localStore.get)
      .mockImplementationOnce(() => "Yolo")
      .mockImplementationOnce(() => expiration);

    connectedRender(
      <LoggedInRootContainer Component={Child} {...{ text: "Yolo" }} />,
      [
        successPayloadAction(
          Type.Login,
          Context.Global,
          addComputedPropertiesToUser(user)
        ),
      ]
    );

    const rootLink = screen.getByRole("link", { name: "Together" });
    expect(rootLink).toHaveAttribute("href", "/main");
  });

  it("should display the user avatar with a link to his account", () => {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 20);

    mocked(localStore.get)
      .mockImplementationOnce(() => "Yolo")
      .mockImplementationOnce(() => expiration);

    connectedRender(
      <LoggedInRootContainer Component={Child} {...{ text: "Yolo" }} />,
      [
        successPayloadAction(
          Type.Login,
          Context.Global,
          addComputedPropertiesToUser(user)
        ),
      ]
    );

    screen.getByRole("img", { name: user.fullName });
    const accountLink = screen.getByRole("link", { name: user.fullName });
    expect(accountLink).toHaveAttribute("href", "/account");
  });

  it("should display a menu button", () => {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 20);

    mocked(localStore.get)
      .mockImplementationOnce(() => "Yolo")
      .mockImplementationOnce(() => expiration);

    connectedRender(
      <LoggedInRootContainer Component={Child} {...{ text: "Yolo" }} />,
      [
        successPayloadAction(
          Type.Login,
          Context.Global,
          addComputedPropertiesToUser(user)
        ),
      ]
    );

    screen.getByRole("button", { name: "menu" });
  });

  it("should display an app bar", () => {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 20);

    mocked(localStore.get)
      .mockImplementationOnce(() => "Yolo")
      .mockImplementationOnce(() => expiration);

    connectedRender(
      <LoggedInRootContainer Component={Child} {...{ text: "Yolo" }} />,
      [
        successPayloadAction(
          Type.Login,
          Context.Global,
          addComputedPropertiesToUser(user)
        ),
      ]
    );

    screen.getByRole("banner", { name: "appbar" });
  });

  it("should display an app bar", () => {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 20);

    mocked(localStore.get)
      .mockImplementationOnce(() => "Yolo")
      .mockImplementationOnce(() => expiration);

    connectedRender(
      <LoggedInRootContainer Component={Child} {...{ text: "Yolo" }} />,
      [
        successPayloadAction(
          Type.Login,
          Context.Global,
          addComputedPropertiesToUser(user)
        ),
      ]
    );

    screen.getByRole("banner", { name: "appbar" });
  });

  it("should render the component passed as prop", () => {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 20);

    mocked(localStore.get)
      .mockImplementationOnce(() => "Yolo")
      .mockImplementationOnce(() => expiration);

    connectedRender(
      <LoggedInRootContainer Component={Child} {...{ text: "Yolo" }} />,
      [
        successPayloadAction(
          Type.Login,
          Context.Global,
          addComputedPropertiesToUser(user)
        ),
      ]
    );

    screen.getByRole("heading", { name: "Yolo" });
  });

  it("should display a loading indicator if app is busy", () => {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 20);

    mocked(localStore.get)
      .mockImplementationOnce(() => "Yolo")
      .mockImplementationOnce(() => expiration);

    connectedRender(
      <LoggedInRootContainer Component={Child} {...{ text: "Yolo" }} />,
      [
        successPayloadAction(
          Type.Login,
          Context.Global,
          addComputedPropertiesToUser(user)
        ),
        sagaPayloadAction(Type.GetDaily, Context.Global),
      ]
    );

    screen.getByRole("progressbar", { name: "global-progress" });
  });

  it("should redirect to login if there is no session token", async () => {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 20);

    mocked(localStore.get)
      .mockImplementationOnce(() => undefined)
      .mockImplementationOnce(() => expiration);

    const { container, history } = connectedRender(
      <LoggedInRootContainer Component={Child} {...{ text: "Yolo" }} />,
      [
        successPayloadAction(
          Type.Login,
          Context.Global,
          addComputedPropertiesToUser(user)
        ),
      ]
    );

    expect(history.location.pathname).toBe("/");
    expect(mocked(localStore.clear)).toHaveBeenCalled();
  });

  it("should redirect to login if there is no session expiration", async () => {
    mocked(localStore.get)
      .mockImplementationOnce(() => "Yolo")
      .mockImplementationOnce(() => undefined);

    const { container, history } = connectedRender(
      <LoggedInRootContainer Component={Child} {...{ text: "Yolo" }} />,
      [
        successPayloadAction(
          Type.Login,
          Context.Global,
          addComputedPropertiesToUser(user)
        ),
      ]
    );

    expect(history.location.pathname).toBe("/");
    expect(mocked(localStore.clear)).toHaveBeenCalled();
  });

  it("should redirect to login if session has expired", async () => {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() - 20);

    mocked(localStore.get)
      .mockImplementationOnce(() => "Yolo")
      .mockImplementationOnce(() => expiration);

    const { container, history } = connectedRender(
      <LoggedInRootContainer Component={Child} {...{ text: "Yolo" }} />,
      [
        successPayloadAction(
          Type.Login,
          Context.Global,
          addComputedPropertiesToUser(user)
        ),
      ]
    );

    expect(history.location.pathname).toBe("/");
    expect(mocked(localStore.clear)).toHaveBeenCalled();
  });
});
