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
    expect(
      (container.firstChild as HTMLElement).classList.contains(
        "MuiGrid-grid-xs-12"
      )
    ).toBe(true);
  });
});
