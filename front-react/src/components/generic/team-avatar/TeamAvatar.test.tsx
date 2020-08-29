import React from "react";

import { createMuiTheme } from "@material-ui/core";
import { render, screen } from "@testing-library/react";

import { stringToColor } from "../../../logic/colors.util";
import TeamAvatar from "./TeamAvatar";

describe("Team avatar component", () => {
  const theme = createMuiTheme();

  it("should have custom colors depending on the team name", () => {
    render(<TeamAvatar team={{ id: "23", name: "Yolo" }} />);

    const color = stringToColor("Yolo");
    const contrastColor = theme.palette.getContrastText(color);

    const avatar = screen.getByRole("img");
    expect(avatar).toHaveStyle(`background-color: ${color};`);
    expect(avatar).toHaveStyle(`color: ${contrastColor};`);
  });

  it("should display the team name initial", () => {
    render(<TeamAvatar team={{ id: "23", name: "Super cool" }} />);

    screen.getByText("SC");
  });

  it("should display a small avatar", () => {
    render(<TeamAvatar team={{ id: "23", name: "Super cool" }} />);

    expect(screen.getByRole("img")).not.toHaveClass("makeStyles-big-11");
  });

  it("should display a big avatar", () => {
    render(<TeamAvatar team={{ id: "23", name: "Super cool" }} isBigAvatar />);

    expect(screen.getByRole("img")).toHaveClass("makeStyles-big-11");
  });
});
