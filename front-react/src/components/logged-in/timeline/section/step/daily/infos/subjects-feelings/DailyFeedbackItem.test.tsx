import React from "react";

import { logRoles, render, screen } from "@testing-library/react";

import {
    teamMembersMockData
} from "../../../../../../../../test-utils/mocked-data/team.members.mock.data";
import { DailyDetailsType } from "./DailyFeedback";
import DailyFeedbackItem from "./DailyFeedbackItem";

describe("Daily deefback item component", () => {
  it("should display nothing if given an invalid type", () => {
    const { container } = render(
      <DailyFeedbackItem
        type={DailyDetailsType.Feeling}
        data={{
          id: "23",
          type: 100,
          comment: "Yolo",
          creator: teamMembersMockData[0],
        }}
      />
    );

    expect(
      screen.queryByRole("listitem", { name: "Daily feedback" })
    ).not.toBeInTheDocument();
  });
});
