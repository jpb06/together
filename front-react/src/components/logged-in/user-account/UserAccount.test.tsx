import React from "react";

import { logRoles, render, screen } from "@testing-library/react";

import {
    invitationSentToCurrentUserMockData
} from "../../../test-utils/mocked-data/invitation.sent.to.current.user.mock.data";
import { loggedUserMockData } from "../../../test-utils/mocked-data/logged.user.mock.data";
import {
    loggedUserTeamsMockData
} from "../../../test-utils/mocked-data/logged.user.teams.mock.data";
import { teamMembersMockData } from "../../../test-utils/mocked-data/team.members.mock.data";
import { connectedRender } from "../../../test-utils/redux/connected.render.helper";
import UserAccount from "./UserAccount";

describe("User account component", () => {
  const logoffMock = jest.fn();

  beforeEach(() => {
    logoffMock.mockReset();
  });

  it("should display join requests addressed to the logged user if there is any", () => {
    connectedRender(
      <UserAccount
        user={{
          ...loggedUserMockData,
          teamJoinRequests: [invitationSentToCurrentUserMockData],
        }}
        userTeams={loggedUserTeamsMockData}
        userCurrentTeam={loggedUserTeamsMockData[0]}
        onLogoff={logoffMock}
      />
    );

    screen.getByRole("heading", { name: "Pending team join requests" });
    screen.getByRole("img", {
      name: invitationSentToCurrentUserMockData.team.name,
    });
  });

  it("should display the current team members", () => {
    const { container } = connectedRender(
      <UserAccount
        user={loggedUserMockData}
        userTeams={loggedUserTeamsMockData}
        userCurrentTeam={loggedUserTeamsMockData[0]}
        onLogoff={logoffMock}
      />
    );

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
  });
});
