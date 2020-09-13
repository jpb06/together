import * as localStore from "local-storage";
import React from "react";
import { mocked } from "ts-jest/utils";

import { logRoles, render, screen } from "@testing-library/react";

import { teamsMockData } from "../../../test-utils/mocked-data/teams.mock.data";
import { timelineMockData } from "../../../test-utils/mocked-data/timeline.mock.data";
import { connectedRender } from "../../../test-utils/redux/connected.render.helper";
import TimeLine from "./TimeLine";

jest.mock("local-storage");

describe("Timeline component", () => {
  beforeEach(() => {
    mocked(localStore.get).mockImplementationOnce(() => teamsMockData[0]);
  });

  it("should display nothing when timeline is null", () => {
    render(<TimeLine timeline={null} />);

    expect(
      screen.queryByRole("heading", {
        name: "Timeline",
      })
    ).toBeNull();
    expect(
      screen.queryByRole("heading", {
        name: "Your events",
      })
    ).toBeNull();
  });

  it("should display something special when timeline is empty", () => {
    connectedRender(<TimeLine timeline={{ userEvents: [] }} />);

    screen.getByRole("img", { name: "feedback-icon" });

    screen.getByText(/Looks like there is nothing to show yet.../i);
    screen.getByText(/Time for a daily?/i);
  });

  it("should display the timeline", () => {
    connectedRender(<TimeLine timeline={timelineMockData} />);

    screen.getByRole("heading", {
      name: "Timeline",
    });
    screen.getByRole("heading", {
      name: "Your events",
    });
  });
});
