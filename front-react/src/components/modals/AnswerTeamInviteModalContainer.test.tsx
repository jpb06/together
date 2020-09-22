import * as localStore from "local-storage";
import React from "react";
import { mocked } from "ts-jest/utils";

import { logRoles, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
    answerTeamInviteAction, getTimelineAction, showAnswerTeamInviteModalAction, successPayloadAction
} from "../../redux/actions";
import { TeamInviteAnswer } from "../../redux/tasks";
import {
    invitationSentToCurrentUserMockData
} from "../../test-utils/mocked-data/invitation.sent.to.current.user.mock.data";
import { loggedUserMockData } from "../../test-utils/mocked-data/logged.user.mock.data";
import { loggedUserTeamsMockData } from "../../test-utils/mocked-data/logged.user.teams.mock.data";
import { connectedRender } from "../../test-utils/redux/connected.render.helper";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../types/redux";
import AnswerTeamInviteModalContainer from "./AnswerTeamInviteModalContainer";

jest.mock("local-storage");

describe("Answer team invite modal component", () => {
  beforeEach(() => {
    mocked(localStore.get).mockReturnValue(loggedUserMockData.teams[0]);
  });

  it("should send an action when accepting the invite", () => {
    const { store } = connectedRender(
      <AnswerTeamInviteModalContainer
        inviteId={invitationSentToCurrentUserMockData.id}
        teamName={invitationSentToCurrentUserMockData.team.name}
      />,
      [showAnswerTeamInviteModalAction(true)]
    );

    const joinButton = screen.getByRole("button", { name: /Let's Join !/i });
    userEvent.click(joinButton);

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(
      answerTeamInviteAction(
        invitationSentToCurrentUserMockData.id,
        TeamInviteAnswer.Accepted,
        true,
        Context.Modal
      )
    );
  });

  it("should send an action to switch team", async () => {
    const { store, container } = connectedRender(
      <AnswerTeamInviteModalContainer
        inviteId={invitationSentToCurrentUserMockData.id}
        teamName={invitationSentToCurrentUserMockData.team.name}
      />,
      [
        showAnswerTeamInviteModalAction(true),
        successPayloadAction(
          Type.GetUserTeams,
          Context.Modal,
          loggedUserTeamsMockData
        ),
      ]
    );

    await screen.findByText(/Congratulations! You just joined team/i);

    const teamButton = screen.getByRole("button", {
      name: loggedUserTeamsMockData[0].name,
    });
    userEvent.click(teamButton);

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(
      getTimelineAction(loggedUserMockData.teams[0].id, Context.Modal)
    );
  });

  it("should fetch the timeline if the option to switch team is declined", async () => {
    const { store, container } = connectedRender(
      <AnswerTeamInviteModalContainer
        inviteId={invitationSentToCurrentUserMockData.id}
        teamName={invitationSentToCurrentUserMockData.team.name}
      />,
      [
        showAnswerTeamInviteModalAction(true),
        successPayloadAction(
          Type.GetUserTeams,
          Context.Modal,
          loggedUserTeamsMockData
        ),
      ]
    );

    await screen.findByText(/Congratulations! You just joined team/i);

    const teamButton = screen.getByRole("button", {
      name: "I don't want to switch team",
    });
    userEvent.click(teamButton);

    const dispatchMock = mocked(store.dispatch);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(
      getTimelineAction(loggedUserMockData.teams[0].id, Context.Modal)
    );
  });
});
