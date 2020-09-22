import React from "react";

import { logRoles, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
    loggedUserTeamsMockData
} from "../../../test-utils/mocked-data/logged.user.teams.mock.data";
import SwitchTeamChoice from "./SwitchTeamChoice";

describe("Switch team choice component", () => {
  const handleTeamSelected = jest.fn();

  const team = loggedUserTeamsMockData[0];

  it("should add a s to member if there is several team members", () => {
    const { container } = render(
      <SwitchTeamChoice
        currentTeamId={team.id}
        team={team}
        onTeamSelected={handleTeamSelected}
      />
    );

    screen.getByText(`${team.members.length} members`);
  });

  it("should should display '1 member'", () => {
    const { container } = render(
      <SwitchTeamChoice
        currentTeamId={team.id}
        team={{ ...team, members: [team.members[0]] }}
        onTeamSelected={handleTeamSelected}
      />
    );

    screen.getByText("1 member");
  });
});
