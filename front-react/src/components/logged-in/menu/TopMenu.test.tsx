import React from "react";

import { fireEvent, logRoles, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { successPayloadAction } from "../../../redux/actions";
import { loggedUserMockData } from "../../../test-utils/mocked-data/logged.user.mock.data";
import { connectedRender } from "../../../test-utils/redux/connected.render.helper";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import TopMenu from "./TopMenu";

describe("Top menu item component", () => {
  it("should display the app bar", () => {
    connectedRender(<TopMenu />, [
      successPayloadAction(Type.Login, Context.Global, loggedUserMockData),
    ]);

    screen.getByRole("banner", { name: "appbar" });
  });

  it("should have a link to the user profile", () => {
    connectedRender(<TopMenu />, [
      successPayloadAction(Type.Login, Context.Global, loggedUserMockData),
    ]);

    const link = screen.getByRole("link", {
      name: loggedUserMockData.fullName,
    });
    expect((link as HTMLLinkElement).href.endsWith("/account")).toBeTruthy();
    screen.getByRole("img", { name: loggedUserMockData.fullName });
  });

  it("should display a button to show left menu", () => {
    connectedRender(<TopMenu />, [
      successPayloadAction(Type.Login, Context.Global, loggedUserMockData),
    ]);

    screen.getByRole("button", { name: "menu" });
  });

  it("should display a link to app root", () => {
    connectedRender(<TopMenu />, [
      successPayloadAction(Type.Login, Context.Global, loggedUserMockData),
    ]);

    const link = screen.getByRole("link", { name: "Together" });
    expect((link as HTMLLinkElement).href.endsWith("/main")).toBeTruthy();
  });

  it("should display the left menu", () => {
    connectedRender(<TopMenu />, [
      successPayloadAction(Type.Login, Context.Global, loggedUserMockData),
    ]);

    const button = screen.getByRole("button", { name: "menu" });
    userEvent.click(button);

    const dailyLink = screen.getByRole("link", { name: "Daily Daily" });
    expect((dailyLink as HTMLLinkElement).href.endsWith("/daily")).toBeTruthy();
    screen.getByRole("img", { name: "Daily" });

    const sprintLink = screen.getByRole("link", { name: "Sprint Sprint" });
    expect(
      (sprintLink as HTMLLinkElement).href.endsWith("/sprint")
    ).toBeTruthy();
    screen.getByRole("img", { name: "Sprint" });

    const teamLink = screen.getByRole("link", { name: "Team Team" });
    expect((teamLink as HTMLLinkElement).href.endsWith("/team")).toBeTruthy();
    screen.getByRole("img", { name: "Team" });

    const statsLink = screen.getByRole("link", { name: "Stats Stats" });
    expect((statsLink as HTMLLinkElement).href.endsWith("/stats")).toBeTruthy();
    screen.getByRole("img", { name: "Stats" });

    const switchTeamLink = screen.getByRole("link", {
      name: "Switch Switch team",
    });
    expect(
      (switchTeamLink as HTMLLinkElement).href.endsWith("/switchteam")
    ).toBeTruthy();
    screen.getByRole("img", { name: "Switch" });
  });
});
