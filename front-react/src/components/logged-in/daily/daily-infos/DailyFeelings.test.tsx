import * as localStore from "local-storage";
import React from "react";
import { mocked } from "ts-jest/utils";

import { logRoles, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { addFeelingAction, removeDetailsAction } from "../../../../redux/actions";
import { DetailsRemovalType } from "../../../../redux/tasks";
import { dailyMockData } from "../../../../test-utils/mocked-data/daily.mock.data";
import { teamMembersMockData } from "../../../../test-utils/mocked-data/team.members.mock.data";
import { connectedRender } from "../../../../test-utils/redux/connected.render.helper";
import { selectMaterialUiSelectOption } from "../../../../test-utils/redux/material.ui.helpers";
import { FeelingKind } from "../../../../types/shared";
import DailyFeelings from "./DailyFeelings";

jest.mock("local-storage");

describe("Daily feelings component", () => {
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

  it("should display a form to add a feeling", () => {
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
      <DailyFeelings
        daily={dailyMockData}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    screen.getByRole("button", { name: "Thumbs up" });
    screen.getByRole("textbox", { name: "Comment" });

    screen.getByRole("button", { name: "left-icon Add" });
  });

  it("should display an empty list of feelings", () => {
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
      <DailyFeelings
        daily={{ ...dailyMockData, feelings: [] }}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    expect(
      screen.queryByRole("list", { name: "Feelings list" })
    ).not.toBeInTheDocument();

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    expect(screen.queryAllByRole("button", { name: "delete" })).toHaveLength(0);
  });

  it("should display one feeling", () => {
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
      <DailyFeelings
        daily={{
          ...dailyMockData,
          feelings: [
            {
              id: "326",
              type: FeelingKind.Satisfaction,
              creator: teamMembersMockData[0],
              comment: "Cool and good",
            },
          ],
        }}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    screen.getByRole("list", { name: "Feelings list" });

    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    screen.getByRole("listitem", { name: "Cool and good" });
    screen.getByRole("img", {
      name: `${teamMembersMockData[0].firstName} ${teamMembersMockData[0].lastName}`,
    });
    screen.getByRole("img", {
      name: "Satisfaction icon",
    });
    screen.getByRole("button", { name: "delete" });
  });

  it("should display two feelings", () => {
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
      <DailyFeelings
        daily={{
          ...dailyMockData,
          feelings: [
            {
              id: "326",
              type: FeelingKind.Satisfaction,
              creator: teamMembersMockData[0],
              comment: "Cool and good",
            },
            {
              id: "327",
              type: FeelingKind.DyingInside,
              creator: teamMembersMockData[1],
              comment: "Oh no",
            },
          ],
        }}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    screen.getByRole("list", { name: "Feelings list" });

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    screen.getByRole("listitem", { name: "Cool and good" });
    screen.getByRole("listitem", { name: "Oh no" });
    screen.getByRole("img", {
      name: `${teamMembersMockData[0].firstName} ${teamMembersMockData[0].lastName}`,
    });
    screen.getByRole("img", {
      name: `${teamMembersMockData[1].firstName} ${teamMembersMockData[1].lastName}`,
    });
    screen.getByRole("img", {
      name: "Satisfaction icon",
    });
    screen.getByRole("img", {
      name: "Dying inside icon",
    });
    expect(screen.getAllByRole("button", { name: "delete" })).toHaveLength(2);
  });

  it("should not send an action if a feeling is already being deleted", () => {
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
      <DailyFeelings
        daily={{
          ...dailyMockData,
          feelings: [
            {
              id: "326",
              type: FeelingKind.Satisfaction,
              creator: teamMembersMockData[0],
              comment: "Cool and good",
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

  it("should send an action to delete a feeling", () => {
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
      <DailyFeelings
        daily={{
          ...dailyMockData,
          feelings: [
            {
              id: "326",
              type: FeelingKind.Satisfaction,
              creator: teamMembersMockData[0],
              comment: "Cool and good",
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
      removeDetailsAction(DetailsRemovalType.Feelings, "23", date, "326")
    );
  });

  it("should not send an action if a feeling is already being created", async () => {
    const addActionFeedback = {
      isPending: true,
      isErrored: false,
      text: "Adding feeling...",
    };
    const deleteActionFeedback = {
      isPending: false,
      term: "",
    };

    const { store } = connectedRender(
      <DailyFeelings
        daily={dailyMockData}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    const comment = "This is not okay no no no.";

    const select = screen.getByRole("button", { name: "Thumbs up" });
    await selectMaterialUiSelectOption(
      select,
      "Dying inside",
      "feeling type select"
    );
    const commentTextbox = screen.getByRole("textbox", {
      name: "Comment",
    });
    userEvent.type(commentTextbox, comment);

    const addButton = screen.getByRole("button", { name: "Adding feeling..." });
    userEvent.click(addButton);

    const mockedDispatch = mocked(store.dispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(0);
  });

  it("should send an action to create a feeling", async () => {
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
      <DailyFeelings
        daily={dailyMockData}
        addActionFeedback={addActionFeedback}
        deleteActionFeedback={deleteActionFeedback}
      />
    );

    const comment = "This is not okay no no no.";

    const select = screen.getByRole("button", { name: "Thumbs up" });
    await selectMaterialUiSelectOption(
      select,
      "Dying inside",
      "feeling type select"
    );
    const commentTextbox = screen.getByRole("textbox", {
      name: "Comment",
    });
    userEvent.type(commentTextbox, comment);

    const addButton = screen.getByRole("button", { name: "left-icon Add" });
    userEvent.click(addButton);

    const mockedDispatch = mocked(store.dispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(
      addFeelingAction("23", date, {
        type: FeelingKind.DyingInside,
        comment,
      })
    );
  });
});
