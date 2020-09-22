import React from "react";

import { logRoles, render, screen } from "@testing-library/react";

import DailyDuration from "./DailyDuration";

describe("Daily duration component", () => {
  it("should display an error text if given an invalid duration", () => {
    render(<DailyDuration durationIndicator="oups" />);

    screen.getByRole("listitem", { name: "Daily duration" });

    expect(screen.queryByText("Less than 15 minutes")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Just a bit more than 15 minutes")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Less than 30 minutes I swear !")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Absolute anarchy")).not.toBeInTheDocument();

    screen.getByText("An error occured while retrieving the daily duration");
  });

  it("should display nothing if no duration is provided", () => {
    render(<DailyDuration durationIndicator="" />);

    expect(
      screen.queryByRole("listitem", { name: "Daily duration" })
    ).not.toBeInTheDocument();

    expect(screen.queryByText("Less than 15 minutes")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Just a bit more than 15 minutes")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Less than 30 minutes I swear !")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Absolute anarchy")).not.toBeInTheDocument();
  });
});
