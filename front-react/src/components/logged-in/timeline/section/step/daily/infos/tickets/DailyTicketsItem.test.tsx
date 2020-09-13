import React from "react";

import { logRoles, render, screen } from "@testing-library/react";

import DailyTicketsItem from "./DailyTicketsItem";

describe("Daily tickets item component", () => {
  it("should take all parent container", () => {
    const { container } = render(<DailyTicketsItem label="Yolo" count={0} />);

    expect(
      (container.firstChild as HTMLElement).classList.contains(
        "MuiGrid-grid-md-12"
      )
    ).toBe(true);
  });

  it("should take half its parent container", () => {
    const { container } = render(<DailyTicketsItem label="Yolo" count={3} />);

    expect(
      (container.firstChild as HTMLElement).classList.contains(
        "MuiGrid-grid-md-6"
      )
    ).toBe(true);
  });
});
