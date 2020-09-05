import * as localStore from "local-storage";
import React from "react";
import { mocked } from "ts-jest/utils";

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
    addDoneTicketAction, removeTicketAction, showSnackbarAction
} from "../../../../redux/actions";
import { TicketRemovalType } from "../../../../redux/tasks";
import { connectedRender } from "../../../../redux/test-utils/connected.render.helper";
import { selectMaterialUiSelectOption } from "../../../../redux/test-utils/material.ui.helpers";
import { Daily } from "../../../../types/shared";
import DailyDoneTickets from "./DailyDoneTickets";

jest.mock("local-storage");

describe("Daily done tickets component", () => {
  const daily: Daily = {
    id: "34",
    teamId: "23",
    day: 1,
    month: 1,
    year: 2000,
    doneTickets: [],
    unforeseenTickets: [],
    feelings: [],
    subjects: [],
    durationIndicator: "0-15",
  };
  const teamMembers = [
    {
      id: "415",
      lastName: "Cool",
      firstName: "Girl",
      avatarName: "Cool.girl.gif",
      email: "cool.girl@great.com",
      status: "Creator",
      joinDate: new Date().toString(),
    },
    {
      id: "416",
      lastName: "Cool",
      firstName: "Man",
      avatarName: "Cool.man.gif",
      email: "cool.man@great.com",
      status: "Member",
      joinDate: new Date().toString(),
    },
  ];

  beforeEach(() => {
    mocked(localStore.get).mockImplementationOnce(() => ({
      id: "23",
      name: "cool kids",
    }));
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
      <DailyDoneTickets
        daily={daily}
        teamMembers={teamMembers}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    screen.getByRole("button", { name: "Key" });
    screen.getByRole("button", { name: "User" });
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
      <DailyDoneTickets
        daily={{
          ...daily,
          doneTickets: [],
        }}
        teamMembers={teamMembers}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    expect(
      screen.queryByRole("list", { name: "Done tickets list" })
    ).not.toBeInTheDocument();

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    expect(
      screen.queryByRole("listitem", { name: "WEB-400" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("img", {
        name: `${teamMembers[0].firstName} ${teamMembers[0].lastName}`,
      })
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
      <DailyDoneTickets
        daily={{
          ...daily,
          doneTickets: [
            {
              id: "326",
              assignee: teamMembers[0],
              creator: teamMembers[0],
              name: "WEB-400",
            },
          ],
        }}
        teamMembers={teamMembers}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    screen.getByRole("list", { name: "Done tickets list" });

    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    screen.getByRole("listitem", { name: "WEB-400" });
    screen.getByRole("img", {
      name: `${teamMembers[0].firstName} ${teamMembers[0].lastName}`,
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
      <DailyDoneTickets
        daily={{
          ...daily,
          doneTickets: [
            {
              id: "326",
              assignee: teamMembers[0],
              creator: teamMembers[0],
              name: "WEB-400",
            },
            {
              id: "327",
              assignee: teamMembers[1],
              creator: teamMembers[1],
              name: "WEB-800",
            },
          ],
        }}
        teamMembers={teamMembers}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    screen.getByRole("list", { name: "Done tickets list" });

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    screen.getByRole("listitem", { name: "WEB-400" });
    screen.getByRole("listitem", { name: "WEB-800" });
    screen.getByRole("img", {
      name: `${teamMembers[0].firstName} ${teamMembers[0].lastName}`,
    });
    screen.getByRole("img", {
      name: `${teamMembers[1].firstName} ${teamMembers[1].lastName}`,
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
      <DailyDoneTickets
        daily={{
          ...daily,
          doneTickets: [
            {
              id: "326",
              assignee: teamMembers[0],
              creator: teamMembers[0],
              name: "WEB-400",
            },
          ],
        }}
        teamMembers={teamMembers}
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
      <DailyDoneTickets
        daily={{
          ...daily,
          doneTickets: [
            {
              id: "326",
              assignee: teamMembers[0],
              creator: teamMembers[0],
              name: "WEB-400",
            },
          ],
        }}
        teamMembers={teamMembers}
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
        TicketRemovalType.Done,
        daily.teamId,
        new Date().toUTCString(),
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
      <DailyDoneTickets
        daily={{
          ...daily,
          doneTickets: [],
        }}
        teamMembers={teamMembers}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    const key = "WEB";
    const number = "400";

    const keySelect = screen.getByRole("button", { name: "Key" });
    await selectMaterialUiSelectOption(keySelect, key, "Key select");
    const userSelect = await screen.findByRole("button", { name: "User" });
    await selectMaterialUiSelectOption(
      userSelect,
      `${teamMembers[0].firstName} ${teamMembers[0].lastName}`,
      "User select"
    );
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
      <DailyDoneTickets
        daily={daily}
        teamMembers={teamMembers}
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
    const userSelect = await screen.findByRole("button", { name: "User" });
    await selectMaterialUiSelectOption(
      userSelect,
      `${teamMembers[0].firstName} ${teamMembers[0].lastName}`,
      "User select"
    );
    userEvent.type(ticketNumberTextbox, number);

    const addButton = screen.getByRole("button", { name: "left-icon Add" });
    userEvent.click(addButton);

    const mockedDispatch = mocked(store.dispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(
      addDoneTicketAction(
        daily.teamId,
        teamMembers[0].email,
        new Date().toUTCString(),
        `${key}-${number}`
      )
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
      <DailyDoneTickets
        daily={{
          ...daily,
          unforeseenTickets: [
            {
              id: "326",
              creator: teamMembers[0],
              name: "WEB-400",
            },
          ],
        }}
        teamMembers={teamMembers}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    const ticketNumberTextbox = screen.getByRole("textbox", {
      name: "Ticket number",
    });

    const key = "WEB";
    const number = "400";

    const keySelect = screen.getByRole("button", { name: "Key" });
    await selectMaterialUiSelectOption(keySelect, key, "Key select");
    const userSelect = await screen.findByRole("button", { name: "User" });
    await selectMaterialUiSelectOption(
      userSelect,
      `${teamMembers[0].firstName} ${teamMembers[0].lastName}`,
      "User select"
    );

    userEvent.type(ticketNumberTextbox, number);

    const addButton = screen.getByRole("button", { name: "left-icon Add" });
    userEvent.click(addButton);

    const mockedDispatch = mocked(store.dispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(
      showSnackbarAction(`The ticket ${key}-${number} has already been added`)
    );
  });

  it("should not create a ticket if assignee does not exist", async () => {
    teamMembers.find = jest.fn().mockImplementationOnce(() => undefined);

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
      <DailyDoneTickets
        daily={daily}
        teamMembers={teamMembers}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    const key = "WEB";
    const number = "400";

    const keySelect = screen.getByRole("button", { name: "Key" });
    await selectMaterialUiSelectOption(keySelect, key, "Key select");
    const userSelect = await screen.findByRole("button", { name: "User" });
    await selectMaterialUiSelectOption(
      userSelect,
      `${teamMembers[0].firstName} ${teamMembers[0].lastName}`,
      "User select"
    );
    const ticketNumberTextbox = screen.getByRole("textbox", {
      name: "Ticket number",
    });
    userEvent.type(ticketNumberTextbox, number);

    const addButton = screen.getByRole("button", { name: "left-icon Add" });
    userEvent.click(addButton);

    const mockedDispatch = mocked(store.dispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(
      showSnackbarAction(`Unable to find ticket ${key}-${number}'s assignee`)
    );
  });
});
