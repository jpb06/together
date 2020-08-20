import React from "react";

import { logRoles, render, screen } from "@testing-library/react";

import SimpleButton from "./SimpleButton";

describe("Simple button component", () => {
  it("should have a button with a custom label", () => {
    const handleClick = () => {};
    render(
      <SimpleButton name="Yolo" text="Button text" onClick={handleClick} />
    );

    expect(screen.getByRole("button", { name: "Yolo" }).textContent).toBe(
      "Button text"
    );
  });

  it("should be full width", () => {
    const handleClick = () => {};
    const { container } = render(
      <SimpleButton
        name="Yolo"
        text="Button text"
        isFullWidth
        onClick={handleClick}
      />
    );

    expect(container.children[0].className).toContain("MuiButton-fullWidth");
  });

  it("should have top margin", () => {
    const handleClick = () => {};
    const { container } = render(
      <SimpleButton
        name="Yolo"
        text="Button text"
        hasTopMargin
        onClick={handleClick}
      />
    );

    expect(container.children[0].className).toContain("makeStyles-topMargin-6");
  });
});
