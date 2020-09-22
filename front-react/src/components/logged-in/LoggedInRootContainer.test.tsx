import * as localStore from "local-storage";
import React from "react";
import { mocked } from "ts-jest/utils";

import { logRoles, screen } from "@testing-library/react";

import { sagaPayloadAction, successPayloadAction } from "../../redux/actions";
import { loggedUserMockData } from "../../test-utils/mocked-data/logged.user.mock.data";
import { connectedRender } from "../../test-utils/redux/connected.render.helper";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../types/redux";
import LoggedInRootContainer from "./LoggedInRootContainer";

jest.mock("local-storage");

interface ChildProps {
  text: string;
}
const Child: React.FC<ChildProps> = ({ text }) => <h1>{text}</h1>;

describe("Logged in root container component", () => {
  it("should display a link to application root", () => {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 20);

    mocked(localStore.get)
      .mockImplementationOnce(() => "Yolo")
      .mockImplementationOnce(() => expiration);

    connectedRender(
      <LoggedInRootContainer Component={Child} {...{ text: "Yolo" }} />,
      [successPayloadAction(Type.Login, Context.Global, loggedUserMockData)]
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
      [successPayloadAction(Type.Login, Context.Global, loggedUserMockData)]
    );

    screen.getByRole("img", { name: loggedUserMockData.fullName });
    const accountLink = screen.getByRole("link", {
      name: loggedUserMockData.fullName,
    });
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
      [successPayloadAction(Type.Login, Context.Global, loggedUserMockData)]
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
      [successPayloadAction(Type.Login, Context.Global, loggedUserMockData)]
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
      [successPayloadAction(Type.Login, Context.Global, loggedUserMockData)]
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
      [successPayloadAction(Type.Login, Context.Global, loggedUserMockData)]
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
        successPayloadAction(Type.Login, Context.Global, loggedUserMockData),
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
      [successPayloadAction(Type.Login, Context.Global, loggedUserMockData)]
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
      [successPayloadAction(Type.Login, Context.Global, loggedUserMockData)]
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
      [successPayloadAction(Type.Login, Context.Global, loggedUserMockData)]
    );

    expect(history.location.pathname).toBe("/");
    expect(mocked(localStore.clear)).toHaveBeenCalled();
  });
});
