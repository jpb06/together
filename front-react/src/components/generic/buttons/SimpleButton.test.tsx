import React from "react";

import { render, screen } from "@testing-library/react";

import SimpleButton from "./SimpleButton";

describe("Simple button component", () => {
  it("should have a button with a custom label", () => {
    const handleClick = () => {};
    render(<SimpleButton text="Button text" onClick={handleClick} />);

    expect(screen.getByRole("button").textContent).toBe("Button text");
  });

  it("should be full width", () => {
    const handleClick = () => {};
    render(
      <SimpleButton text="Button text" isFullWidth onClick={handleClick} />
    );

    expect(screen.getByRole("button").className).toContain(
      "MuiButton-fullWidth"
    );
  });

  it("should have top margin", () => {
    const handleClick = () => {};
    render(
      <SimpleButton text="Button text" hasTopMargin onClick={handleClick} />
    );

    expect(screen.getByRole("button").className).toContain(
      "makeStyles-topMargin-6"
    );
  });
});
