import * as localStore from "local-storage";
import React from "react";
import { mocked } from "ts-jest/utils";

import { logRoles, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { addSubjectAction, removeDetailsAction } from "../../../../redux/actions";
import { DetailsRemovalType } from "../../../../redux/tasks";
import { dailyMockData } from "../../../../test-utils/mocked-data/daily.mock.data";
import { teamMembersMockData } from "../../../../test-utils/mocked-data/team.members.mock.data";
import { connectedRender } from "../../../../test-utils/redux/connected.render.helper";
import { selectMaterialUiSelectOption } from "../../../../test-utils/redux/material.ui.helpers";
import { SubjectKind } from "../../../../types/shared";
import DailySubjects from "./DailySubjects";

jest.mock("local-storage");

describe("Daily subjects component", () => {
  beforeEach(() => {
    mocked(localStore.get).mockImplementationOnce(() => ({
      id: "23",
      name: "cool kids",
    }));
  });

  it("should display a form to add a subject", () => {
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
      <DailySubjects
        daily={dailyMockData}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    screen.getByRole("button", { name: "Drive" });
    screen.getByRole("textbox", { name: "Comment" });

    screen.getByRole("button", { name: "left-icon Add" });
  });

  it("should display an empty list of subjects", () => {
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
      <DailySubjects
        daily={dailyMockData}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    expect(
      screen.queryByRole("list", { name: "Subjects list" })
    ).not.toBeInTheDocument();

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    expect(screen.queryAllByRole("button", { name: "delete" })).toHaveLength(0);
  });

  it("should display one subject", () => {
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
      <DailySubjects
        daily={{
          ...dailyMockData,
          subjects: [
            {
              id: "326",
              type: SubjectKind.Risk,
              creator: teamMembersMockData[0],
              description: "We're in the poopoo",
            },
          ],
        }}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    screen.getByRole("list", { name: "Subjects list" });

    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    screen.getByRole("listitem", { name: "We're in the poopoo" });
    screen.getByRole("img", {
      name: `${teamMembersMockData[0].firstName} ${teamMembersMockData[0].lastName}`,
    });
    screen.getByRole("img", {
      name: "Risk icon",
    });
    screen.getByRole("button", { name: "delete" });
  });

  it("should display two subjects", () => {
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
      <DailySubjects
        daily={{
          ...dailyMockData,
          subjects: [
            {
              id: "326",
              type: SubjectKind.Risk,
              creator: teamMembersMockData[0],
              description: "We're in the poopoo",
            },
            {
              id: "327",
              type: SubjectKind.Goal,
              creator: teamMembersMockData[1],
              description: "Let's do stuffs",
            },
          ],
        }}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    screen.getByRole("list", { name: "Subjects list" });

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    screen.getByRole("listitem", { name: "We're in the poopoo" });
    screen.getByRole("listitem", { name: "Let's do stuffs" });
    screen.getByRole("img", {
      name: `${teamMembersMockData[0].firstName} ${teamMembersMockData[0].lastName}`,
    });
    screen.getByRole("img", {
      name: `${teamMembersMockData[1].firstName} ${teamMembersMockData[1].lastName}`,
    });
    screen.getByRole("img", {
      name: "Risk icon",
    });
    screen.getByRole("img", {
      name: "Goal icon",
    });
    expect(screen.getAllByRole("button", { name: "delete" })).toHaveLength(2);
  });

  it("should not send an action if a subject is already being deleted", () => {
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
      <DailySubjects
        daily={{
          ...dailyMockData,
          subjects: [
            {
              id: "326",
              type: SubjectKind.Risk,
              creator: teamMembersMockData[0],
              description: "We're in the poopoo",
            },
          ],
        }}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    const deleteButton = screen.getByRole("button", { name: "delete-icon" });
    userEvent.click(deleteButton);

    const mockedDispatch = mocked(store.dispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(0);
  });

  it("should send an action to delete a subject", () => {
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
      <DailySubjects
        daily={{
          ...dailyMockData,
          subjects: [
            {
              id: "326",
              type: SubjectKind.Risk,
              creator: teamMembersMockData[0],
              description: "We're in the poopoo",
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
      removeDetailsAction(
        DetailsRemovalType.Subjects,
        "23",
        new Date().toUTCString(),
        "326"
      )
    );
  });

  it("should not send an action if a subject is already being created", async () => {
    const addActionFeedback = {
      isPending: true,
      isErrored: false,
      text: "Adding subject...",
    };
    const deleteActionFeedback = {
      isPending: false,
      term: "",
    };

    const { store } = connectedRender(
      <DailySubjects
        daily={dailyMockData}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    const select = screen.getByRole("button", { name: "Drive" });
    await selectMaterialUiSelectOption(select, "Goal", "subject type select");
    const commentTextbox = screen.getByRole("textbox", {
      name: "Comment",
    });
    userEvent.type(commentTextbox, "I want to be great");

    const addButton = screen.getByRole("button", { name: "Adding subject..." });
    userEvent.click(addButton);

    const mockedDispatch = mocked(store.dispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(0);
  });

  it("should send an action to create a subject", async () => {
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
      <DailySubjects
        daily={dailyMockData}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    const description = "I want to be great";

    const select = screen.getByRole("button", { name: "Drive" });
    await selectMaterialUiSelectOption(select, "Goal", "subject type select");
    const descriptionTextbox = screen.getByRole("textbox", {
      name: "Comment",
    });
    userEvent.type(descriptionTextbox, description);

    const addButton = screen.getByRole("button", { name: "left-icon Add" });
    userEvent.click(addButton);

    const mockedDispatch = mocked(store.dispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(
      addSubjectAction("23", new Date().toUTCString(), {
        type: SubjectKind.Goal,
        description,
      })
    );
  });
});
