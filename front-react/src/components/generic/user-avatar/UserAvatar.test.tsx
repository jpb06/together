import React from "react";

import { createMuiTheme } from "@material-ui/core";
import { logRoles, render, screen } from "@testing-library/react";

import { stringToColor } from "../../../logic/colors.util";
import { getInitials } from "../../../logic/user.util";
import { TerseUser } from "../../../types/shared";
import UserAvatar from "./UserAvatar";

describe("User avatar component", () => {
  const theme = createMuiTheme();
  const user: TerseUser = {
    id: "34",
    lastName: "Yolo",
    firstName: "Man",
    avatarName: "yoloman.gif",
    email: "yolo.man@cool.org",
  };

  it("should display an image if defined", () => {
    render(<UserAvatar user={user} />);

    const avatar = screen.getByRole("img");
    expect(avatar).toHaveAttribute(
      "src",
      `/static/images/avatars/${user.avatarName}`
    );
    expect(avatar).toHaveAttribute("alt", `${user.firstName} ${user.lastName}`);
  });

  it("should display an image, using user's full name as alt if exists", () => {
    render(<UserAvatar user={{ ...user, fullName: "Yolo cool" }} />);

    const avatar = screen.getByRole("img");
    expect(avatar).toHaveAttribute(
      "src",
      `/static/images/avatars/${user.avatarName}`
    );
    expect(avatar).toHaveAttribute("alt", "Yolo cool");
  });

  it("should display a small image", () => {
    render(<UserAvatar user={user} />);

    expect(screen.getByRole("img").parentNode).not.toHaveClass(
      "makeStyles-big-11"
    );
  });

  it("should display a big image", () => {
    render(<UserAvatar user={user} isBigAvatar />);

    expect(screen.getByRole("img").parentNode).toHaveClass("makeStyles-big-11");
  });

  it("should display user initials", () => {
    const fullName = `${user.firstName} ${user.lastName}`;

    render(<UserAvatar user={{ ...user, avatarName: "" }} />);

    const avatar = screen.getByRole("img");
    expect(avatar.textContent).toBe(getInitials(fullName));
  });

  it("should be colored depending on user's computed fullName", () => {
    render(<UserAvatar user={{ ...user, avatarName: "" }} />);

    const color = stringToColor(`${user.firstName} ${user.lastName}`);
    const contrastColor = theme.palette.getContrastText(color);

    const avatar = screen.getByRole("img");
    expect(avatar).toHaveStyle(`background-color: ${color};`);
    expect(avatar).toHaveStyle(`color: ${contrastColor};`);
  });

  it("should be colored depending on user's defined fullName", () => {
    const fullName = "cool and good";
    render(
      <UserAvatar user={{ ...user, avatarName: "", fullName: fullName }} />
    );

    const color = stringToColor(fullName);
    const contrastColor = theme.palette.getContrastText(color);

    const avatar = screen.getByRole("img");
    expect(avatar).toHaveStyle(`background-color: ${color};`);
    expect(avatar).toHaveStyle(`color: ${contrastColor};`);
  });

  it("should display a big avatar with user initials", () => {
    const fullName = `${user.firstName} ${user.lastName}`;

    render(<UserAvatar user={{ ...user, avatarName: "" }} isBigAvatar />);

    expect(screen.getByRole("img")).toHaveClass("makeStyles-big-23");
  });

  it("should display a small avatar with user initials", () => {
    const fullName = `${user.firstName} ${user.lastName}`;

    render(<UserAvatar user={{ ...user, avatarName: "" }} />);

    expect(screen.getByRole("img")).not.toHaveClass("makeStyles-big-23");
  });

  it("should display user initials if given", () => {
    const initials = "YOLO";

    render(
      <UserAvatar user={{ ...user, avatarName: "", initials: initials }} />
    );

    expect(screen.getByRole("img").textContent).toBe(initials);
  });
});
