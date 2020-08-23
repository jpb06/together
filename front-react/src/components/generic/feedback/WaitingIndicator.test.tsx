import React from "react";

import WarningIcon from "@material-ui/icons/Warning";
import { render, screen } from "@testing-library/react";

import WaitingIndicator, { WaitingIndicatorcolors } from "./WaitingIndicator";

describe("Waiting indicator component", () => {
  it("should display an icon", () => {
    render(<WaitingIndicator text="Yolo" IconComponent={WarningIcon} />);

    screen.getByRole("img", { name: /waiting-icon/i });
  });

  it("should display the provided text", () => {
    render(<WaitingIndicator text="Yolo" IconComponent={WarningIcon} />);

    screen.getByText("Yolo");
  });

  it("should have no top padding by default", () => {
    const { container } = render(
      <WaitingIndicator text="Yolo" IconComponent={WarningIcon} />
    );

    expect(container.children[0].className).not.toContain("topPadding");
  });

  it("should have top padding", () => {
    const { container } = render(
      <WaitingIndicator text="Yolo" IconComponent={WarningIcon} hasTopPadding />
    );

    expect(container.children[0].className).toContain("topPadding");
  });

  it("should have no bottom margin by default", () => {
    const { container } = render(
      <WaitingIndicator text="Yolo" IconComponent={WarningIcon} />
    );

    expect(container.children[0].className).not.toContain("bottomMargin");
  });

  it("should have top padding", () => {
    const { container } = render(
      <WaitingIndicator
        text="Yolo"
        IconComponent={WarningIcon}
        hasBottomMargin
      />
    );

    expect(container.children[0].className).toContain("bottomMargin");
  });

  it("should have white color by default", () => {
    const { container } = render(
      <WaitingIndicator text="Yolo" IconComponent={WarningIcon} />
    );

    expect(container.children[0].className).toContain("whiteColored");
  });

  it("should have amber color", () => {
    const { container } = render(
      <WaitingIndicator
        text="Yolo"
        IconComponent={WarningIcon}
        color={WaitingIndicatorcolors.Amber}
      />
    );

    expect(container.children[0].className).toContain("amberColored");
  });

  it("should have white color if explicitely stated", () => {
    const { container } = render(
      <WaitingIndicator
        text="Yolo"
        IconComponent={WarningIcon}
        color={WaitingIndicatorcolors.White}
      />
    );

    expect(container.children[0].className).toContain("whiteColored");
  });
});
