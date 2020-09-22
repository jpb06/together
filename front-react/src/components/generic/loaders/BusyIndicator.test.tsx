import React from "react";

import WarningIcon from "@material-ui/icons/Warning";
import { render, screen } from "@testing-library/react";

import BusyIndicator, { BusyIndicatorColor } from "./BusyIndicator";

describe("Busy indicator component", () => {
  it("should display an icon", () => {
    render(
      <BusyIndicator
        text="Yolo"
        IconComponent={WarningIcon}
        color={BusyIndicatorColor.White}
        hasTopPadding={false}
      />
    );

    screen.getByRole("img", { name: /busy-icon/i });
  });

  it("should display the provided text", () => {
    render(
      <BusyIndicator
        text="Yolo"
        IconComponent={WarningIcon}
        color={BusyIndicatorColor.White}
        hasTopPadding={false}
      />
    );

    screen.getByText("Yolo");
  });

  it("should have no top padding", () => {
    const { container } = render(
      <BusyIndicator
        text="Yolo"
        IconComponent={WarningIcon}
        color={BusyIndicatorColor.White}
        hasTopPadding={false}
      />
    );

    expect(container.children[0].className).not.toContain("topPadding");
  });

  it("should have top padding", () => {
    const { container } = render(
      <BusyIndicator
        text="Yolo"
        IconComponent={WarningIcon}
        color={BusyIndicatorColor.White}
        hasTopPadding
      />
    );

    expect(container.children[0].className).toContain("topPadding");
  });

  it("should have amber color", () => {
    const { container } = render(
      <BusyIndicator
        text="Yolo"
        IconComponent={WarningIcon}
        color={BusyIndicatorColor.Amber}
        hasTopPadding={false}
      />
    );

    expect(container.children[0].className).toContain("amberColored");
  });

  it("should have white color", () => {
    const { container } = render(
      <BusyIndicator
        text="Yolo"
        IconComponent={WarningIcon}
        color={BusyIndicatorColor.White}
        hasTopPadding={false}
      />
    );

    expect(container.children[0].className).toContain("whiteColored");
  });
});
