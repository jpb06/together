import {
    dailyToTeamTimeLineEntry, invitedUserToTeamTimeLineEntry, teamInviteToUserTimeLineEntry,
    teamJoinRequestToUserTimeLineEntry, teamMemberToTeamTimeLineEntry,
    userJoinRequestToTeamTimeLineEntry
} from "../../stack-shared-code/conversion-helpers/types.conversion.helpers";
import { TimeLine } from "../../stack-shared-code/types";
import { dailyMockData } from "./daily.mock.data";
import { invitationSentToCurrentUserMockData } from "./invitation.sent.to.current.user.mock.data";
import { invitedUserMockData } from "./invited.user.mock.data";
import {
    JoinRequestSentByCurrentUserMockData
} from "./join.request.sent.by.current.user.mock.data";
import { joinRequestToCurrentTeamMockData } from "./join.request.to.current.team.mock.data";
import { teamMembersMockData } from "./team.members.mock.data";
import { teamsMockData } from "./teams.mock.data";

export const timelineMockData: TimeLine = {
  currentTeam: {
    ...teamsMockData[0],
    events: [
      dailyToTeamTimeLineEntry(dailyMockData),
      userJoinRequestToTeamTimeLineEntry(joinRequestToCurrentTeamMockData),
      invitedUserToTeamTimeLineEntry(invitedUserMockData),
      teamMemberToTeamTimeLineEntry(teamMembersMockData[0]),
    ],
  },
  userEvents: [
    teamInviteToUserTimeLineEntry(invitationSentToCurrentUserMockData),
    teamJoinRequestToUserTimeLineEntry(JoinRequestSentByCurrentUserMockData),
  ],
};
