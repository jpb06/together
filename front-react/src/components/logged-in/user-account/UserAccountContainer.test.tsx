import * as localStore from "local-storage";
import React from "react";
import { mocked } from "ts-jest/utils";

import { logRoles, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as Hook from "../../../hooks/use.user.teams.loading.hook";
import { getUserTeamsAction, successPayloadAction } from "../../../redux/actions";
import { loggedUserMockData } from "../../../test-utils/mocked-data/logged.user.mock.data";
import { teamsMockData } from "../../../test-utils/mocked-data/teams.mock.data";
import { connectedRender } from "../../../test-utils/redux/connected.render.helper";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import UserAccountContainer from "./UserAccountContainer";

jest.mock("local-storage");

describe("User account container component", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    mocked(localStore.get).mockReturnValue(teamsMockData[0]);
  });

  it("should display a loading indicator while user teams are being fetched", () => {
    connectedRender(<UserAccountContainer />, [
      successPayloadAction(Type.Login, Context.Global, loggedUserMockData),
    ]);

    screen.getByRole("img", { name: "waiting-icon" });
    screen.getByText("Sinister Dexter Has a Broken Spirometer");

    expect(
      screen.queryByRole("heading", {
        name: "My account",
      })
    ).toBeNull();
    expect(
      screen.queryByRole("heading", {
        name: "My teams",
      })
    ).toBeNull();
    expect(
      screen.queryByRole("heading", {
        name: "Current team",
      })
    ).toBeNull();
    expect(
      screen.queryByRole("heading", {
        name: "Your others teams",
      })
    ).toBeNull();
  });

  it("should dispatch an action to fetch the user teams", async () => {
    const { store } = connectedRender(<UserAccountContainer />, [
      successPayloadAction(Type.Login, Context.Global, loggedUserMockData),
    ]);

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(
      getUserTeamsAction(loggedUserMockData.id, false)
    );
  });

  it("should retrieve the user current team", async () => {
    jest.spyOn(Hook, "useUserTeamsLoading").mockReturnValue(
      teamsMockData.map((el) => ({
        ...el,
        members: [],
        invitedUsers: [],
        joinRequests: [],
        lastActivity: "",
      }))
    );

    connectedRender(<UserAccountContainer />, [
      successPayloadAction(Type.Login, Context.Global, loggedUserMockData),
      successPayloadAction(Type.GetUserTeams, Context.Global, teamsMockData),
    ]);

    await screen.findByText(/My account/i);

    screen.getByRole("heading", {
      name: "Current team",
    });

    screen.getByRole("heading", {
      name: "Your others teams",
    });
  });

  it("should logoff the user", async () => {
    jest.spyOn(Hook, "useUserTeamsLoading").mockReturnValue(
      teamsMockData.map((el) => ({
        ...el,
        members: [],
        invitedUsers: [],
        joinRequests: [],
        lastActivity: "",
      }))
    );

    const { history } = connectedRender(<UserAccountContainer />, [
      successPayloadAction(Type.Login, Context.Global, loggedUserMockData),
      successPayloadAction(Type.GetUserTeams, Context.Global, teamsMockData),
    ]);

    await screen.findByText(/My account/i);

    const logoffButton = screen.getByRole("button", { name: "Logoff" });
    userEvent.click(logoffButton);

    expect(mocked(localStore.clear)).toHaveBeenCalledTimes(1);
    expect(history.location.pathname).toBe("/");
  });
});
