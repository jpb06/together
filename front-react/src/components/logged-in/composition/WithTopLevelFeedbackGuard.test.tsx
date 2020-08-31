import React from "react";

import { logRoles, render, screen } from "@testing-library/react";

import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import WithTopLevelFeedbackGuard from "./WithTopLevelFeedbackGuard";

describe("With top level feedback guard hoc component", () => {
  it("should not display passed jsx if condition is false", () => {
    const falsyCondition = 1 === 0;

    render(
      <WithTopLevelFeedbackGuard
        displayJsxCondition={falsyCondition}
        jsx={<h1>Hmm</h1>}
        title="My cool title"
        message="My great message"
      />
    );

    const icon = screen.getByRole("img", { name: "feedback-icon" });
    expect(icon.nextSibling).toHaveTextContent("My cool title");
    expect(icon.parentNode).toHaveTextContent("My cool titleMy great message");

    expect(screen.queryByRole("heading")).toBeNull();
  });

  it("should not display passed jsx if condition is false", () => {
    const truthyCondition = 1 === 1;

    render(
      <WithTopLevelFeedbackGuard
        displayJsxCondition={truthyCondition}
        jsx={<h1>Hmm</h1>}
        title="My cool title"
        message="My great message"
      />
    );

    expect(screen.queryByRole("img", { name: "feedback-icon" })).toBeNull();
    expect(screen.queryByText("My cool title")).toBeNull();
    expect(screen.queryByText("My cool titleMy great message")).toBeNull();

    screen.getByRole("heading", { name: "Hmm" });
  });
});
