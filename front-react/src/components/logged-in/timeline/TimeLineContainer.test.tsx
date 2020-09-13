import * as localStore from "local-storage";
import React from "react";
import { mocked } from "ts-jest/utils";

import { screen } from "@testing-library/react";

import { getTimelineAction, sagaPayloadAction, successPayloadAction } from "../../../redux/actions";
import { loggedUserMockData } from "../../../test-utils/mocked-data/logged.user.mock.data";
import { teamsMockData } from "../../../test-utils/mocked-data/teams.mock.data";
import { connectedRender } from "../../../test-utils/redux/connected.render.helper";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import TimeLineContainer from "./TimeLineContainer";

jest.mock("local-storage");
describe("Timeline container component", () => {
  beforeEach(() => {
    mocked(localStore.get).mockImplementationOnce(() => teamsMockData[0]);
  });

  it("should display a loading indicator while timeline is being fetched", () => {
    connectedRender(<TimeLineContainer />, [
      successPayloadAction(Type.Login, Context.Global, loggedUserMockData),
      sagaPayloadAction(Type.GetTimeline, Context.Global),
    ]);

    screen.getByRole("img", { name: "waiting-icon" });
    screen.getByText("Sinister Dexter Has a Broken Spirometer");

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

  it("should dispatch as action to fetch the timeline", async () => {
    const { store } = connectedRender(<TimeLineContainer />, [
      successPayloadAction(Type.Login, Context.Global, loggedUserMockData),
    ]);

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(
      getTimelineAction(teamsMockData[0].id, Context.Global)
    );
  });
});
