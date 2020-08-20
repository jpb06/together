import React from "react";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import { render, screen } from "@testing-library/react";

import FeedbackButton from "./FeedbackButton";

describe("Feedback button feedback", () => {
  it("should have a button with a name", () => {
    render(
      <FeedbackButton
        name="Yolo"
        IconComponent={AddCircleIcon}
        actionText="Action"
        isErrored={false}
        isPending={false}
      />
    );

    screen.getByRole("button", { name: /yolo/i });
  });

  it("should display an icon when pending is false", () => {
    render(
      <FeedbackButton
        name="Yolo"
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
        name="Yolo"
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
        name="Yolo"
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

  it("should display an action text", () => {
    const actionText = "Cool action";
    const { container } = render(
      <FeedbackButton
        name="Yolo"
        IconComponent={AddCircleIcon}
        actionText={actionText}
        isErrored={false}
        isPending={false}
      />
    );

    expect(container.children[0].children[0].children[1].textContent).toEqual(
      actionText
    );
  });
});
