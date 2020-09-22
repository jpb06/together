import React from "react";

import { render, screen } from "@testing-library/react";

import {
    teamMembersMockData
} from "../../../../../../test-utils/mocked-data/team.members.mock.data";
import {
    getTextWithMarkup
} from "../../../../../../test-utils/testing-library/with.markup.helpers";
import NewTeamMemberNotice from "./NewTeamMemberNotice";

describe("New team member notice component", () => {
  it("should display the user when he created the team", () => {
    const user = teamMembersMockData[0];
    render(<NewTeamMemberNotice member={user} />);

    getTextWithMarkup(`${user.firstName} ${user.lastName} created the team.`);
  });

  it("should display the user when he joined the team", () => {
    const user = teamMembersMockData[1];
    render(<NewTeamMemberNotice member={user} />);

    getTextWithMarkup(`${user.firstName} ${user.lastName} joined the team!`);
  });
});
