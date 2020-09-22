import React from "react";

import { screen } from "@testing-library/react";

import { getTimelineAction, showErrorAction, successPayloadAction } from "../../../redux/actions";
import { connectedRender } from "../../../test-utils/redux/connected.render.helper";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import WithLoadingAndErrors from "./WithLoadingAndErrors";

describe("With loading and error hoc component", () => {
  it("should display passed jsx by default", () => {
    connectedRender(
      <WithLoadingAndErrors
        feedbackText="Yolo"
        context={Context.Global}
        jsx={<h1>Hmm</h1>}
      />
    );

    screen.getByRole("heading", { name: "Hmm" });
    expect(screen.queryByRole("img", { name: "waiting-icon" })).toBeNull();
  });

  it("should display a loading indicator if context is busy", () => {
    connectedRender(
      <WithLoadingAndErrors
        feedbackText="Yolo"
        context={Context.Global}
        jsx={<h1>Hmm</h1>}
      />,
      [getTimelineAction("23", Context.Global)]
    );

    expect(screen.queryByRole("heading", { name: "Hmm" })).toBeNull();
    screen.getByRole("img", { name: "waiting-icon" });
  });

  it("should display passed jsx if another context is busy", () => {
    connectedRender(
      <WithLoadingAndErrors
        feedbackText="Yolo"
        context={Context.Global}
        jsx={<h1>Hmm</h1>}
      />,
      [getTimelineAction("23", Context.Modal)]
    );

    screen.getByRole("heading", { name: "Hmm" });
    expect(screen.queryByRole("img", { name: "waiting-icon" })).toBeNull();
  });

  it("should display passed jsx after a succesful action", () => {
    connectedRender(
      <WithLoadingAndErrors
        feedbackText="Yolo"
        context={Context.Global}
        jsx={<h1>Hmm</h1>}
      />,
      [
        getTimelineAction("23", Context.Global),
        successPayloadAction(Type.GetTimeline, Context.Global, {}),
      ]
    );

    screen.getByRole("heading", { name: "Hmm" });
    expect(screen.queryByRole("img", { name: "waiting-icon" })).toBeNull();
  });

  it("should display some feedback if an error occured", () => {
    const { container } = connectedRender(
      <WithLoadingAndErrors
        feedbackText="Yolo"
        context={Context.Global}
        jsx={<h1>Hmm</h1>}
      />,
      [
        getTimelineAction("23", Context.Global),
        showErrorAction(Type.GetTimeline, Context.Global, "Oh no!"),
      ]
    );

    const icon = screen.getByRole("img", { name: "feedback-icon" });
    expect(icon.nextSibling).toHaveTextContent("Oh no!");
    expect(icon.parentNode).toHaveTextContent("Oh no!Yolo");
  });
});
