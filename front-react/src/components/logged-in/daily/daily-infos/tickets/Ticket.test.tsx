import React from "react";

import { logRoles, render, screen } from "@testing-library/react";

import { teamMembersMockData } from "../../../../../test-utils/mocked-data/team.members.mock.data";
import Ticket from "./Ticket";
import { TicketUserType } from "./TicketList";

describe("Ticket component", () => {
  const deleteEvent = jest.fn();

  beforeEach(() => {
    deleteEvent.mockReset();
  });

  it("should display a pending action icon", () => {
    const deleteActionFeedback = {
      isPending: true,
      term: "Yolo",
    };

    const { container } = render(
      <Ticket
        name="Yolo"
        user={teamMembersMockData[0]}
        userType={TicketUserType.Creator}
        feedback={deleteActionFeedback}
        showDivider={false}
        onTicketDeletion={deleteEvent}
      />
    );

    screen.getByRole("img", { name: "delete-icon" });
    screen.getByRole("button", { name: "delete-icon" });
    screen.getByRole("progressbar", { name: "circular-pending" });
  });
});
