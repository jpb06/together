import React from "react";

import { logRoles, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { loggedUserMockData } from "../../../../test-utils/mocked-data/logged.user.mock.data";
import {
    loggedUserTeamsMockData
} from "../../../../test-utils/mocked-data/logged.user.teams.mock.data";
import { connectedRender } from "../../../../test-utils/redux/connected.render.helper";
import TeamsList from "./TeamsList";

describe("Team list test component", () => {
  it("should display the current team members and an invite button", () => {
    connectedRender(
      <TeamsList
        user={loggedUserMockData}
        teams={loggedUserTeamsMockData}
        currentTeam={loggedUserTeamsMockData[0]}
      />
    );

    screen.getByRole("heading", {
      name: "Current team",
    });
    loggedUserTeamsMockData[0].members.forEach(
      ({ firstName, lastName, status }) => {
        const user = screen.getByRole("img", {
          name: `${firstName} ${lastName}`,
        });
        expect(
          user?.parentElement?.parentElement?.parentElement?.childNodes[1]
            .textContent
        ).toBe(`${firstName} ${lastName}`);
        expect(
          user?.parentElement?.parentElement?.parentElement?.childNodes[2]
            .textContent
        ).toBe(status);
      }
    );

    screen.getByRole("button", {
      name: "invite user",
    });
  });

  it("should display the second team members", () => {
    connectedRender(
      <TeamsList
        user={loggedUserMockData}
        teams={loggedUserTeamsMockData}
        currentTeam={loggedUserTeamsMockData[0]}
      />
    );

    const switchTeamButton = screen.getByRole("button", {
      name: "The great team",
    });
    userEvent.click(switchTeamButton);

    screen.getByRole("heading", {
      name: "Your others teams",
    });
    loggedUserTeamsMockData[1].members.forEach(
      ({ firstName, lastName, status }) => {
        const user = screen.getByRole("img", {
          name: `${firstName} ${lastName}`,
        });
        expect(
          user?.parentElement?.parentElement?.parentElement?.childNodes[1]
            .textContent
        ).toBe(`${firstName} ${lastName}`);
        expect(
          user?.parentElement?.parentElement?.parentElement?.childNodes[2]
            .textContent
        ).toBe(status);
      }
    );
  });

  it("should open a modal to invite users to the current team", async () => {
    connectedRender(
      <TeamsList
        user={loggedUserMockData}
        teams={loggedUserTeamsMockData}
        currentTeam={loggedUserTeamsMockData[0]}
      />
    );

    const inviteUserButton = screen.getByRole("button", {
      name: "invite user",
    });
    userEvent.click(inviteUserButton);

    await screen.findByText(/Invite users to your team/i);

    screen.getByRole("textbox", { name: "User email" });

    screen.getByRole("button", { name: "Send invite" });
    screen.getByRole("button", { name: "Close" });
  });

  it("should close the invite modal", async () => {
    connectedRender(
      <TeamsList
        user={loggedUserMockData}
        teams={loggedUserTeamsMockData}
        currentTeam={loggedUserTeamsMockData[0]}
      />
    );

    const inviteUserButton = screen.getByRole("button", {
      name: "invite user",
    });
    userEvent.click(inviteUserButton);

    await screen.findByText(/Invite users to your team/i);

    const closeButton = screen.getByRole("button", { name: "Close" });
    userEvent.click(closeButton);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole("button", { name: "Close" })
    );
    expect(
      screen.queryByRole("button", { name: "Send invite" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("textbox", { name: "User email" })
    ).not.toBeInTheDocument();
  });
});
