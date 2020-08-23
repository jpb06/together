import React from "react";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FeedbackButton from "./FeedbackButton";

describe("Feedback button feedback", () => {
  it("should have a button with a name", () => {
    render(
      <FeedbackButton
        IconComponent={AddCircleIcon}
        actionText="Action"
        isErrored={false}
        isPending={false}
      />
    );

    screen.getByText("Action");
  });

  it("should display an icon when pending is false", () => {
    render(
      <FeedbackButton
        IconComponent={AddCircleIcon}
        actionText="Action"
        isErrored={false}
        isPending={false}
      />
    );

    screen.getByRole("img", { name: /left-icon/i });
  });

  it("should display a circular progress if pending is true", () => {
    render(
      <FeedbackButton
        IconComponent={AddCircleIcon}
        actionText="Action"
        isErrored={false}
        isPending={true}
      />
    );

    expect(screen.queryByRole("img", { name: /left-icon/i })).toBeNull();
    expect(screen.queryByRole("img", { name: /error-icon/i })).toBeNull();
    screen.getByRole("progressbar", { name: "circular-pending" });
  });

  it("should display a specific icon if errored is true", () => {
    render(
      <FeedbackButton
        IconComponent={AddCircleIcon}
        actionText="Action"
        isErrored={true}
        isPending={false}
      />
    );

    screen.getByRole("img", { name: /error-icon/i });
    expect(screen.queryByRole("img", { name: /left-icon/i })).toBeNull();
    expect(
      screen.queryByRole("progressbar", { name: "circular-pending" })
    ).toBeNull();
  });

  it("should have a button invoking the onSubmit prop", () => {
    const handleClick = jest.fn();

    render(
      <FeedbackButton
        IconComponent={AddCircleIcon}
        actionText="Action"
        isErrored={true}
        isPending={false}
        onSubmit={handleClick}
      />
    );

    userEvent.click(screen.getByText("Action"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
