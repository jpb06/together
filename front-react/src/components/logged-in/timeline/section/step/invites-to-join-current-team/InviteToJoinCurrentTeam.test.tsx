import * as localStore from "local-storage";
import React from "react";
import { mocked } from "ts-jest/utils";

import { successPayloadAction } from "../../../../../../redux/actions";
import {
    invitedUserMockData
} from "../../../../../../test-utils/mocked-data/invited.user.mock.data";
import { loggedUserMockData } from "../../../../../../test-utils/mocked-data/logged.user.mock.data";
import { connectedRender } from "../../../../../../test-utils/redux/connected.render.helper";
import {
    getTextWithMarkup
} from "../../../../../../test-utils/testing-library/with.markup.helpers";
import {
    ReduxActionContext as Context, ReduxActionType as Type
} from "../../../../../../types/redux";
import InviteToJoinCurrentTeam from "./InviteToJoinCurrentTeam";

jest.mock("local-storage");

describe("Invite to join current team component", () => {
  beforeEach(() => {
    mocked(localStore.get).mockImplementationOnce(
      () => loggedUserMockData.teams[0]
    );
  });

  it("should display the invite if it was sent by another member of the team", () => {
    connectedRender(<InviteToJoinCurrentTeam invite={invitedUserMockData} />, [
      successPayloadAction(Type.Login, Context.Global, loggedUserMockData),
    ]);

    getTextWithMarkup(
      `${invitedUserMockData.referrer.firstName} ${invitedUserMockData.referrer.lastName} has invited ${invitedUserMockData.invitee.firstName} ${invitedUserMockData.invitee.lastName} to join the team.`
    );
  });

  it("should display the invite if it was sent by the current user", () => {
    const { container } = connectedRender(
      <InviteToJoinCurrentTeam
        invite={{ ...invitedUserMockData, referrer: loggedUserMockData }}
      />,
      [successPayloadAction(Type.Login, Context.Global, loggedUserMockData)]
    );

    getTextWithMarkup(
      `You have invited ${invitedUserMockData.invitee.firstName} ${invitedUserMockData.invitee.lastName} to join the team.`
    );
  });
});
