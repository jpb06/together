import React from "react";

import { screen } from "@testing-library/react";

import { sagaPayloadAction, successPayloadAction } from "../../../redux/actions";
import { dailyMockData } from "../../../test-utils/mocked-data/daily.mock.data";
import { loggedUserMockData } from "../../../test-utils/mocked-data/logged.user.mock.data";
import { connectedRender } from "../../../test-utils/redux/connected.render.helper";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import DailyContainer from "./DailyContainer";

describe("Daily container component", () => {
  it("should warn the user his team has no team members by default", () => {
    connectedRender(<DailyContainer />);

    const icon = screen.getByRole("img", { name: "feedback-icon" });
    expect(icon.nextElementSibling).toHaveTextContent("No team");
    expect(icon.nextElementSibling?.nextElementSibling).toHaveTextContent(
      "You don't appear to belong to any team yet"
    );

    expect(
      screen.queryByRole("heading", {
        name: "What happened since the last daily ?",
      })
    ).toBeNull();
    expect(
      screen.queryByRole("heading", {
        name: "Is there something else worth noting?",
      })
    ).toBeNull();
  });

  it("should warn the user his team has no team members even if daily is loaded", () => {
    connectedRender(<DailyContainer />, [
      successPayloadAction(Type.Login, Context.Global, loggedUserMockData),
      successPayloadAction(Type.GetDaily, Context.Global, dailyMockData),
    ]);

    const icon = screen.getByRole("img", { name: "feedback-icon" });
    expect(icon.nextElementSibling).toHaveTextContent("No team");
    expect(icon.nextElementSibling?.nextElementSibling).toHaveTextContent(
      "You don't appear to belong to any team yet"
    );

    expect(
      screen.queryByRole("heading", {
        name: "What happened since the last daily ?",
      })
    ).toBeNull();
    expect(
      screen.queryByRole("heading", {
        name: "Is there something else worth noting?",
      })
    ).toBeNull();
  });

  it("should display a loading indicator if there is team members but daily hasn't being fetched yet", () => {
    connectedRender(<DailyContainer />, [
      successPayloadAction(Type.Login, Context.Global, loggedUserMockData),
      successPayloadAction(Type.TeamMembers, Context.Global, [
        {
          id: "415",
          lastName: "Cool",
          firstName: "Girl",
          avatarName: "Cool.girl.gif",
          email: "cool.girl@great.com",
          status: "Creator",
          joinDate: new Date(),
        },
      ]),
      sagaPayloadAction(Type.GetDaily, Context.Global),
    ]);

    screen.getByRole("img", { name: "waiting-icon" });
    screen.getByText("Sinister Dexter Has a Broken Spirometer");

    expect(
      screen.queryByRole("heading", {
        name: "What happened since the last daily ?",
      })
    ).toBeNull();
    expect(
      screen.queryByRole("heading", {
        name: "Is there something else worth noting?",
      })
    ).toBeNull();
  });

  it("should display a daily", () => {
    connectedRender(<DailyContainer />, [
      successPayloadAction(Type.Login, Context.Global, loggedUserMockData),
      successPayloadAction(Type.TeamMembers, Context.Global, [
        {
          id: "415",
          lastName: "Cool",
          firstName: "Girl",
          avatarName: "Cool.girl.gif",
          email: "cool.girl@great.com",
          status: "Creator",
          joinDate: new Date(),
        },
      ]),
      successPayloadAction(Type.GetDaily, Context.Global, dailyMockData),
    ]);

    screen.getByRole("heading", {
      name: "What happened since the last daily ?",
    });
    screen.getByRole("heading", {
      name: "Is there something else worth noting?",
    });
  });
});
