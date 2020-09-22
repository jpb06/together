import React from "react";

import { screen } from "@testing-library/react";

import { connectedRender } from "../../../test-utils/redux/connected.render.helper";
import SideMenu from "./SideMenu";

describe("Side menu item component", () => {
  let toggleDrawerEvent = (isOpen: boolean) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {};
  toggleDrawerEvent = jest.fn(toggleDrawerEvent);

  it("should display nothing when not opened", () => {
    connectedRender(
      <SideMenu isOpen={false} toggleDrawer={toggleDrawerEvent} />
    );

    expect(
      screen.queryByRole("link", { name: "Together" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Daily Daily" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Sprint Sprint" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Team Team" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Stats Stats" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Switch Switch team" })
    ).not.toBeInTheDocument();
  });

  it("should contain menu links", async () => {
    connectedRender(<SideMenu isOpen toggleDrawer={toggleDrawerEvent} />);

    const togetherLink = screen.getByRole("link", { name: "Together" });
    expect(
      (togetherLink as HTMLLinkElement).href.endsWith("/main")
    ).toBeTruthy();

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
