import React from "react";

import { render, screen } from "@testing-library/react";

import ColoredFatLinearProgress, {
  FatProgressColor,
} from "./ColoredFatLinearProgress";

describe("Busy indicator component", () => {
  it("should display a loading indicator", () => {
    render(
      <ColoredFatLinearProgress
        variant="query"
        color={FatProgressColor.Amber}
      />
    );

    screen.getByRole("progressbar", { name: "fat-progress" });
  });
});
