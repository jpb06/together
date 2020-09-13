import React from "react";

import { logRoles, render, screen } from "@testing-library/react";

import { dailyMockData } from "../../../../../../test-utils/mocked-data/daily.mock.data";
import Daily from "./Daily";

describe("Daily component", () => {
  it("should display a daily", () => {
    render(<Daily daily={dailyMockData} />);

    screen.getByRole("list", { name: "Daily" });
    screen.getByRole("list", { name: "Subjects list" });
    screen.getByRole("list", { name: "Feelings list" });

    screen.getByRole("listitem", { name: "Daily duration" });
    screen.getByRole("listitem", { name: "Unforeseen tickets list" });
    screen.getByRole("listitem", { name: "Done tickets list" });
  });

  it("should display the tickets details even if there is only unforeseen tickets", () => {
    render(<Daily daily={{ ...dailyMockData, doneTickets: [] }} />);

    screen.getByRole("list", { name: "Daily" });
    screen.getByRole("list", { name: "Subjects list" });
    screen.getByRole("list", { name: "Feelings list" });

    screen.getByRole("listitem", { name: "Daily duration" });
    screen.getByRole("listitem", { name: "Unforeseen tickets list" });
    screen.getByRole("listitem", { name: "Done tickets list" });
  });

  it("should display the tickets details even if there is only done tickets", () => {
    render(<Daily daily={{ ...dailyMockData, unforeseenTickets: [] }} />);

    screen.getByRole("list", { name: "Daily" });
    screen.getByRole("list", { name: "Subjects list" });
    screen.getByRole("list", { name: "Feelings list" });

    screen.getByRole("listitem", { name: "Daily duration" });
    screen.getByRole("listitem", { name: "Unforeseen tickets list" });
    screen.getByRole("listitem", { name: "Done tickets list" });
  });

  it("should display a message if daily has no data", () => {
    render(
      <Daily
        daily={{
          ...dailyMockData,
          durationIndicator: "",
          doneTickets: [],
          unforeseenTickets: [],
          feelings: [],
          subjects: [],
        }}
      />
    );

    screen.getByText(
      "Ooops! Looks like nobody had time to give some insight about this daily. Time to bump the Scrum Master?"
    );
  });
});
