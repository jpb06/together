import React from "react";

import { screen } from "@testing-library/react";

import { connectedRender } from "../../../../test-utils/redux/connected.render.helper";
import { Daily } from "../../../../types/shared";
import DailyDuration from "../daily-infos/DailyDuration";
import DailyReportContentBox from "./DailyReportContentBox";

describe("Daily report content box hoc component", () => {
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

  it("should display a duration selector", () => {
    const feedback = {
      isValidated: false,
      isPending: false,
    };
    connectedRender(
      <DailyReportContentBox
        title="Daily duration"
        ContentComponent={DailyDuration}
        data={{ daily }}
        feedback={feedback}
      />
    );

    screen.getByRole("button", { name: "Less than 15 minutes" });
  });

  it("should display a loading indicator", () => {
    const feedback = {
      isValidated: false,
      isPending: true,
    };
    connectedRender(
      <DailyReportContentBox
        title="Daily duration"
        ContentComponent={DailyDuration}
        data={{ daily }}
        feedback={feedback}
      />
    );

    screen.getByRole("button", { name: "Less than 15 minutes" });
    screen.getByRole("progressbar", { name: "daily-loading" });
  });
});
