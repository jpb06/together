import * as localStore from "local-storage";
import React from "react";
import { mocked } from "ts-jest/utils";

import { logRoles, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LocalStorageKeys from "../../../../../../logic/local.storage.keys";
import {
    answerTeamInviteAction, getTimelineAction, successPayloadAction
} from "../../../../../../redux/actions";
import { TeamInviteAnswer } from "../../../../../../redux/tasks";
import {
    invitationSentToCurrentUserMockData
} from "../../../../../../test-utils/mocked-data/invitation.sent.to.current.user.mock.data";
import { loggedUserMockData } from "../../../../../../test-utils/mocked-data/logged.user.mock.data";
import { teamsMockData } from "../../../../../../test-utils/mocked-data/teams.mock.data";
import { connectedRender } from "../../../../../../test-utils/redux/connected.render.helper";
import {
    getTextWithMarkup
} from "../../../../../../test-utils/testing-library/with.markup.helpers";
import {
    ReduxActionContext as Context, ReduxActionType as Type
} from "../../../../../../types/redux";
import InvitationSentToCurrentUser from "./InvitationSentToCurrentUser";

jest.mock("local-storage");

describe("Invitation sent to current user component", () => {
  beforeEach(() => {
    mocked(localStore.get).mockImplementation(
      () => loggedUserMockData.teams[0]
    );
  });
  it("should display the invite and action buttons to join or decline", () => {
    const invite = invitationSentToCurrentUserMockData;
    const { container } = connectedRender(
      <InvitationSentToCurrentUser invite={invite} />
    );

    getTextWithMarkup(
      `You have been invited to join team ${invite.team.name} by ${invite.referrer.firstName} ${invite.referrer.lastName}.`
    );

    screen.getByRole("button", { name: "Join" });
    screen.getByRole("button", { name: "Decline" });
  });

  it("should send an action to decline the invite", async () => {
    const invite = invitationSentToCurrentUserMockData;
    const { store, container } = connectedRender(
      <InvitationSentToCurrentUser invite={invite} />,
      [successPayloadAction(Type.Login, Context.Global, loggedUserMockData)]
    );

    const openDeclinebutton = screen.getByRole("button", { name: "Decline" });
    userEvent.click(openDeclinebutton);

    await screen.findByText(
      /You are about to decline the invite to join team/i
    );

    const declineButton = screen.getByRole("button", {
      name: "Yes",
    });
    userEvent.click(declineButton);

    expect(mocked(localStore.get)).toHaveBeenLastCalledWith(
      LocalStorageKeys.currentTeam
    );
    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      1,
      answerTeamInviteAction(invite.id, TeamInviteAnswer.Declined)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      2,
      getTimelineAction(teamsMockData[0].id)
    );
  });
});
