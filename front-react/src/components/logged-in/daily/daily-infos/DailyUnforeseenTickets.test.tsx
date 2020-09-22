import * as localStore from "local-storage";
import React from "react";
import { mocked } from "ts-jest/utils";

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
    addUnforeseenTicketAction, removeTicketAction, showSnackbarAction
} from "../../../../redux/actions";
import { TicketRemovalType } from "../../../../redux/tasks";
import { dailyMockData } from "../../../../test-utils/mocked-data/daily.mock.data";
import { teamMembersMockData } from "../../../../test-utils/mocked-data/team.members.mock.data";
import { connectedRender } from "../../../../test-utils/redux/connected.render.helper";
import { selectMaterialUiSelectOption } from "../../../../test-utils/redux/material.ui.helpers";
import DailyUnforeseenTickets from "./DailyUnforeseenTickets";

jest.mock("local-storage");

describe("Daily done tickets component", () => {
  const date = new Date().toUTCString();

  beforeEach(() => {
    mocked(localStore.get).mockImplementationOnce(() => ({
      id: "23",
      name: "cool kids",
    }));

    jest.spyOn(Date.prototype, "toUTCString").mockReturnValue(date);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should display a form to add a ticket", () => {
    const addActionFeedback = {
      isPending: false,
      isErrored: false,
      text: "Add",
    };
    const deleteActionFeedback = {
      isPending: false,
      term: "",
    };

    connectedRender(
      <DailyUnforeseenTickets
        daily={dailyMockData}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    screen.getByRole("button", { name: "Key" });
    screen.getByRole("textbox", { name: "Ticket number" });

    screen.getByRole("button", { name: "left-icon Add" });
  });

  it("should display an empty list of tickets", () => {
    const addActionFeedback = {
      isPending: false,
      isErrored: false,
      text: "Add",
    };
    const deleteActionFeedback = {
      isPending: false,
      term: "",
    };

    connectedRender(
      <DailyUnforeseenTickets
        daily={{ ...dailyMockData, unforeseenTickets: [] }}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    expect(
      screen.queryByRole("list", { name: "Tickets list" })
    ).not.toBeInTheDocument();

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    expect(
      screen.queryByRole("listitem", { name: "WEB-400" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "delete" })
    ).not.toBeInTheDocument();
  });

  it("should display one ticket", () => {
    const addActionFeedback = {
      isPending: false,
      isErrored: false,
      text: "Add",
    };
    const deleteActionFeedback = {
      isPending: false,
      term: "",
    };

    connectedRender(
      <DailyUnforeseenTickets
        daily={{
          ...dailyMockData,
          unforeseenTickets: [
            {
              id: "326",
              creator: teamMembersMockData[0],
              name: "WEB-400",
            },
          ],
        }}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    screen.getByRole("list", { name: "Tickets list" });

    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    screen.getByRole("listitem", { name: "WEB-400" });
    screen.getByRole("img", {
      name: `${teamMembersMockData[0].firstName} ${teamMembersMockData[0].lastName}`,
    });
    screen.getByRole("button", { name: "delete" });
  });

  it("should display two tickets", () => {
    const addActionFeedback = {
      isPending: false,
      isErrored: false,
      text: "Add",
    };
    const deleteActionFeedback = {
      isPending: false,
      term: "",
    };

    connectedRender(
      <DailyUnforeseenTickets
        daily={{
          ...dailyMockData,
          unforeseenTickets: [
            {
              id: "326",
              creator: teamMembersMockData[0],
              name: "WEB-400",
            },
            {
              id: "327",
              creator: teamMembersMockData[1],
              name: "WEB-401",
            },
          ],
        }}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    screen.getByRole("list", { name: "Tickets list" });

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    screen.getByRole("listitem", { name: "WEB-400" });
    screen.getByRole("listitem", { name: "WEB-401" });
    screen.getByRole("img", {
      name: `${teamMembersMockData[0].firstName} ${teamMembersMockData[0].lastName}`,
    });
    screen.getByRole("img", {
      name: `${teamMembersMockData[1].firstName} ${teamMembersMockData[1].lastName}`,
    });
    expect(screen.getAllByRole("button", { name: "delete" })).toHaveLength(2);
  });

  it("should not send an action if a ticket is already being deleted", () => {
    const addActionFeedback = {
      isPending: false,
      isErrored: false,
      text: "Add",
    };
    const deleteActionFeedback = {
      isPending: true,
      term: "326",
    };

    const { store } = connectedRender(
      <DailyUnforeseenTickets
        daily={{
          ...dailyMockData,
          unforeseenTickets: [
            {
              id: "326",
              creator: teamMembersMockData[0],
              name: "WEB-400",
            },
          ],
        }}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    const deleteButton = screen.getByRole("button", { name: "delete" });
    userEvent.click(deleteButton);

    const mockedDispatch = mocked(store.dispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(0);
  });

  it("should send an action to delete a ticket", () => {
    const addActionFeedback = {
      isPending: false,
      isErrored: false,
      text: "Add",
    };
    const deleteActionFeedback = {
      isPending: false,
      term: "",
    };

    const { store } = connectedRender(
      <DailyUnforeseenTickets
        daily={{
          ...dailyMockData,
          unforeseenTickets: [
            {
              id: "326",
              creator: teamMembersMockData[0],
              name: "WEB-400",
            },
          ],
        }}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    const deleteButton = screen.getByRole("button", { name: "delete" });
    userEvent.click(deleteButton);

    const mockedDispatch = mocked(store.dispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(
      removeTicketAction(
        TicketRemovalType.Unforeseen,
        dailyMockData.teamId,
        date,
        "WEB-400"
      )
    );
  });

  it("should not send an action if a ticket is already being created", async () => {
    const addActionFeedback = {
      isPending: true,
      isErrored: false,
      text: "Adding ticket...",
    };
    const deleteActionFeedback = {
      isPending: false,
      term: "",
    };

    const { store } = connectedRender(
      <DailyUnforeseenTickets
        daily={dailyMockData}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    const key = "WEB";
    const number = "400";

    const keySelect = screen.getByRole("button", { name: "Key" });
    await selectMaterialUiSelectOption(keySelect, key, "Key select");
    const ticketNumberTextbox = screen.getByRole("textbox", {
      name: "Ticket number",
    });
    userEvent.type(ticketNumberTextbox, number);

    const addButton = screen.getByRole("button", { name: "Adding ticket..." });
    userEvent.click(addButton);

    const mockedDispatch = mocked(store.dispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(0);
  });

  it("should send an action to create a ticket", async () => {
    const addActionFeedback = {
      isPending: false,
      isErrored: false,
      text: "Add",
    };
    const deleteActionFeedback = {
      isPending: false,
      term: "",
    };

    const { store } = connectedRender(
      <DailyUnforeseenTickets
        daily={dailyMockData}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    const ticketNumberTextbox = screen.getByRole("textbox", {
      name: "Ticket number",
    });

    const key = "WEB";
    const number = "528";

    const keySelect = screen.getByRole("button", { name: "Key" });
    await selectMaterialUiSelectOption(keySelect, key, "Key select");
    userEvent.type(ticketNumberTextbox, number);

    const addButton = screen.getByRole("button", { name: "left-icon Add" });
    userEvent.click(addButton);

    const mockedDispatch = mocked(store.dispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(
      addUnforeseenTicketAction(dailyMockData.teamId, date, `${key}-${number}`)
    );
  });

  it("should not create a ticket if it already exists as done", async () => {
    const addActionFeedback = {
      isPending: false,
      isErrored: false,
      text: "Add",
    };
    const deleteActionFeedback = {
      isPending: false,
      term: "",
    };

    const { store } = connectedRender(
      <DailyUnforeseenTickets
        daily={{
          ...dailyMockData,
          doneTickets: [
            {
              id: "326",
              creator: teamMembersMockData[0],
              assignee: teamMembersMockData[1],
              name: "WEB-400",
            },
          ],
        }}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    const key = "WEB";
    const number = "400";

    const keySelect = screen.getByRole("button", { name: "Key" });
    await selectMaterialUiSelectOption(keySelect, key, "Key select");
    const ticketNumberTextbox = screen.getByRole("textbox", {
      name: "Ticket number",
    });
    userEvent.type(ticketNumberTextbox, number);

    const addButton = screen.getByRole("button", { name: "left-icon Add" });
    userEvent.click(addButton);

    const mockedDispatch = mocked(store.dispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(
      showSnackbarAction(`The ticket ${key}-${number} has already been added`)
    );
  });

  it("should not create a ticket if it already exists as unforeseen", async () => {
    const addActionFeedback = {
      isPending: false,
      isErrored: false,
      text: "Add",
    };
    const deleteActionFeedback = {
      isPending: false,
      term: "",
    };

    const { store } = connectedRender(
      <DailyUnforeseenTickets
        daily={{
          ...dailyMockData,
          unforeseenTickets: [
            {
              id: "326",
              creator: teamMembersMockData[0],
              name: "WEB-400",
            },
          ],
        }}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    const key = "WEB";
    const number = "400";

    const keySelect = screen.getByRole("button", { name: "Key" });
    await selectMaterialUiSelectOption(keySelect, key, "Key select");
    const ticketNumberTextbox = screen.getByRole("textbox", {
      name: "Ticket number",
    });
    userEvent.type(ticketNumberTextbox, number);

    const addButton = screen.getByRole("button", { name: "left-icon Add" });
    userEvent.click(addButton);

    const mockedDispatch = mocked(store.dispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(
      showSnackbarAction(`The ticket ${key}-${number} has already been added`)
    );
  });
});
