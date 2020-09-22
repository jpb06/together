import * as localStore from "local-storage";
import React from "react";
import { mocked } from "ts-jest/utils";

import { logRoles, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
    inviteUserToTeamAction, sagaPayloadAction, successPayloadAction
} from "../../redux/actions";
import { loggedUserMockData } from "../../test-utils/mocked-data/logged.user.mock.data";
import { loggedUserTeamsMockData } from "../../test-utils/mocked-data/logged.user.teams.mock.data";
import { connectedRender } from "../../test-utils/redux/connected.render.helper";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../types/redux";
import InviteUserToTeamModal from "./InviteUserToTeamModal";

jest.mock("local-storage");

describe("Invite user to team modal component", () => {
  beforeEach(() => {
    mocked(localStore.get).mockReturnValue(loggedUserMockData.teams[0]);
  });
  const handleClose = jest.fn();

  it("should display a loading indicator", () => {
    const { store, container } = connectedRender(
      <InviteUserToTeamModal
        isOpened={true}
        teamId={loggedUserTeamsMockData[0].id}
        onClose={handleClose}
      />,
      [sagaPayloadAction(Type.GetDaily, Context.Modal)]
    );

    screen.getByText(/Sending invitation/i);
    screen.getByRole("img", { name: /waiting-icon/i });
  });

  it("should send an invite action", () => {
    const { store, container } = connectedRender(
      <InviteUserToTeamModal
        isOpened={true}
        teamId={loggedUserTeamsMockData[0].id}
        onClose={handleClose}
      />,
      [successPayloadAction(Type.Login, Context.Global, loggedUserMockData)]
    );

    const email = "ben@together.com";
    const emailInput = screen.getByRole("textbox", { name: "User email" });
    userEvent.type(emailInput, email);

    const confirmButton = screen.getByRole("button", { name: "Send invite" });
    userEvent.click(confirmButton);

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(
      inviteUserToTeamAction(
        loggedUserTeamsMockData[0].id,
        email,
        Context.Modal
      )
    );
  });

  it("should not send an invite action if email is invalid", () => {
    const { store, container } = connectedRender(
      <InviteUserToTeamModal
        isOpened={true}
        teamId={loggedUserTeamsMockData[0].id}
        onClose={handleClose}
      />,
      [successPayloadAction(Type.Login, Context.Global, loggedUserMockData)]
    );

    const email = "yoloman";
    const emailInput = screen.getByRole("textbox", { name: "User email" });
    userEvent.type(emailInput, email);

    const confirmButton = screen.getByRole("button", { name: "Send invite" });
    userEvent.click(confirmButton);

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(0);
  });
});
