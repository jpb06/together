import React from "react";
import { mocked } from "ts-jest/utils";

import { screen } from "@testing-library/react";

import { splittedDateToString } from "../../../../logic/date.util";
import { setDailyDurationAction } from "../../../../redux/actions";
import { dailyMockData } from "../../../../test-utils/mocked-data/daily.mock.data";
import { connectedRender } from "../../../../test-utils/redux/connected.render.helper";
import { selectMaterialUiSelectOption } from "../../../../test-utils/redux/material.ui.helpers";
import DailyDuration from "./DailyDuration";

describe("Daily duration component", () => {
  it("should display an unset duration", () => {
    connectedRender(
      <DailyDuration daily={{ ...dailyMockData, durationIndicator: "" }} />
    );

    expect(
      screen.queryByRole("button", { name: "Less than 15 minutes" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: "Just a bit more than 15 minutes",
      })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Less than 30 minutes I swear !" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Absolute anarchy" })
    ).not.toBeInTheDocument();
  });

  it("should display a duration", () => {
    connectedRender(
      <DailyDuration daily={{ ...dailyMockData, durationIndicator: "0-15" }} />
    );

    screen.getByRole("button", { name: "Less than 15 minutes" });
  });

  it("should send an action to change the duration", async () => {
    const { store } = connectedRender(
      <DailyDuration daily={{ ...dailyMockData, durationIndicator: "0-15" }} />
    );

    const select = screen.getByRole("button");
    await selectMaterialUiSelectOption(
      select,
      "Absolute anarchy",
      "Duration select"
    );

    const mockedDispatch = mocked(store.dispatch);
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    const date = splittedDateToString(
      dailyMockData.day,
      dailyMockData.month,
      dailyMockData.year
    );
    expect(mockedDispatch).toHaveBeenCalledWith(
      setDailyDurationAction(dailyMockData.teamId, date, "20+")
    );
  });
});
