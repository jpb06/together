import React from "react";

import { render, screen } from "@testing-library/react";

import PasswordStrength from "./PasswordStrength";

describe("Password strength indicator component", () => {
  it("should display nothing if password is empty", () => {
    render(<PasswordStrength password="" />);

    expect(screen.queryByText("Password strength")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("progressbar", { name: "password-strength" })
    ).not.toBeInTheDocument();
  });

  it("should react to very weak passwords", () => {
    render(<PasswordStrength password="y" />);

    screen.getByText("Password strength - veryWeak");

    const progress = screen.getByRole("progressbar", {
      name: "password-strength",
    });
    const progressValue = progress.attributes.getNamedItem("aria-valuenow");
    expect(progressValue).not.toBeNull();
    expect(parseInt(progressValue?.value as string, 10)).toBeLessThan(5);
  });

  it("should react to weak passwords", () => {
    render(<PasswordStrength password="yolo66" />);

    screen.getByText("Password strength - weak");

    const progress = screen.getByRole("progressbar", {
      name: "password-strength",
    });
    const progressValue = progress.attributes.getNamedItem("aria-valuenow");
    expect(progressValue).not.toBeNull();
    expect(parseInt(progressValue?.value as string, 10)).toBeLessThan(35);
  });

  it("should react to medium passwords", () => {
    render(<PasswordStrength password="12345!r" />);

    screen.getByText("Password strength - medium");

    const progress = screen.getByRole("progressbar", {
      name: "password-strength",
    });
    const progressValue = progress.attributes.getNamedItem("aria-valuenow");
    expect(progressValue).not.toBeNull();
    expect(parseInt(progressValue?.value as string, 10)).toBeLessThan(55);
  });

  it("should react to strong passwords", () => {
    render(<PasswordStrength password="12345!r$D" />);

    screen.getByText("Password strength - strong");

    const progress = screen.getByRole("progressbar", {
      name: "password-strength",
    });
    const progressValue = progress.attributes.getNamedItem("aria-valuenow");
    expect(progressValue).not.toBeNull();
    expect(parseInt(progressValue?.value as string, 10)).toBeLessThan(80);
  });

  it("should react to perfect passwords", () => {
    render(<PasswordStrength password="12345!r$DTY+" />);

    screen.getByText("Password strength - perfect");

    const progress = screen.getByRole("progressbar", {
      name: "password-strength",
    });
    const progressValue = progress.attributes.getNamedItem("aria-valuenow");
    expect(progressValue).not.toBeNull();
    expect(progressValue?.value).toBe("100");
  });
});
