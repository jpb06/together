import React from "react";
import { mocked } from "ts-jest/utils";

import { logRoles, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { teamMembersMockData } from "../../../../../test-utils/mocked-data/team.members.mock.data";
import { selectMaterialUiSelectOption } from "../../../../../test-utils/redux/material.ui.helpers";
import NewTicket from "./NewTicket";

describe("New ticket component", () => {
  const addEvent = jest.fn();

  beforeEach(() => {
    addEvent.mockReset();
  });

  it("should display a form to add a ticket", () => {
    const addActionFeedback = {
      isPending: false,
      isErrored: false,
      text: "Add",
    };

    render(
      <NewTicket
        users={teamMembersMockData}
        feedback={addActionFeedback}
        onTicketCreation={addEvent}
      />
    );

    screen.getByRole("button", { name: "Key" });
    screen.getByRole("button", { name: "User" });
    screen.getByRole("textbox", { name: "Ticket number" });

    screen.getByRole("button", { name: "left-icon Add" });
  });

  it("should send a callback when data is ok", async () => {
    const addActionFeedback = {
      isPending: false,
      isErrored: false,
      text: "Add",
    };

    render(
      <NewTicket
        users={teamMembersMockData}
        feedback={addActionFeedback}
        onTicketCreation={addEvent}
      />
    );

    const ticketNumberTextbox = screen.getByRole("textbox", {
      name: "Ticket number",
    });

    const key = "WEB";
    const number = "528";

    const keySelect = screen.getByRole("button", { name: "Key" });
    await selectMaterialUiSelectOption(keySelect, key, "Key select");
    const userSelect = await screen.findByRole("button", { name: "User" });
    await selectMaterialUiSelectOption(
      userSelect,
      `${teamMembersMockData[0].firstName} ${teamMembersMockData[0].lastName}`,
      "User select"
    );
    userEvent.type(ticketNumberTextbox, number);

    const addButton = screen.getByRole("button", { name: "left-icon Add" });
    userEvent.click(addButton);

    const addEventMock = mocked(addEvent);
    expect(addEventMock).toHaveBeenCalledTimes(1);
    expect(addEventMock).toHaveBeenLastCalledWith({
      key,
      number: parseInt(number, 10),
      userId: teamMembersMockData[0].id,
    });
  });

  it("should not send a callback if number is invalid", async () => {
    const addActionFeedback = {
      isPending: false,
      isErrored: false,
      text: "Add",
    };

    render(
      <NewTicket
        users={teamMembersMockData}
        feedback={addActionFeedback}
        onTicketCreation={addEvent}
      />
    );

    const ticketNumberTextbox = screen.getByRole("textbox", {
      name: "Ticket number",
    });

    const key = "WEB";
    const number = "yolo";

    const keySelect = screen.getByRole("button", { name: "Key" });
    await selectMaterialUiSelectOption(keySelect, key, "Key select");
    const userSelect = await screen.findByRole("button", { name: "User" });
    await selectMaterialUiSelectOption(
      userSelect,
      `${teamMembersMockData[0].firstName} ${teamMembersMockData[0].lastName}`,
      "User select"
    );
    userEvent.type(ticketNumberTextbox, number);

    const addButton = screen.getByRole("button", { name: "left-icon Add" });
    userEvent.click(addButton);

    const addEventMock = mocked(addEvent);
    expect(addEventMock).toHaveBeenCalledTimes(0);
  });

  it("should send a callback without selecting a user", async () => {
    const addActionFeedback = {
      isPending: false,
      isErrored: false,
      text: "Add",
    };

    render(
      <NewTicket feedback={addActionFeedback} onTicketCreation={addEvent} />
    );

    const ticketNumberTextbox = screen.getByRole("textbox", {
      name: "Ticket number",
    });

    const key = "WEB";
    const number = "123";

    const keySelect = screen.getByRole("button", { name: "Key" });
    await selectMaterialUiSelectOption(keySelect, key, "Key select");
    userEvent.type(ticketNumberTextbox, number);

    const addButton = screen.getByRole("button", { name: "left-icon Add" });
    userEvent.click(addButton);

    const addEventMock = mocked(addEvent);
    expect(addEventMock).toHaveBeenCalledTimes(1);
    expect(addEventMock).toHaveBeenLastCalledWith({
      key,
      number: parseInt(number, 10),
      userId: "",
    });
  });
});
