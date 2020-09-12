import { TimeLine, TimeLineEntryKind } from "../../types/shared";
import { dailyMockData } from "./daily.mock.data";
import { teamsMockData } from "./teams.mock.data";
import { terseUsersMockData } from "./terse.users.mock.data";

export const timelineMockData: TimeLine = {
  currentTeam: {
    ...teamsMockData[0],
    events: [
      {
        type: TimeLineEntryKind.Daily,
        shortTitle: "Daily - 01/01/2000",
        date: new Date().toISOString(),
        entry: dailyMockData,
      },
      {
        type: TimeLineEntryKind.JoinRequestToCurrentTeam,
        shortTitle: "Join request - 25/02/2020",
        date: new Date().toISOString(),
        entry: {
          id: "60",
          date: new Date().toISOString(),
          user: terseUsersMockData[1],
        },
      },
      {
        type: TimeLineEntryKind.InviteToJoinCurrentTeam,
        shortTitle: "Invite - 01/01/2000",
        date: new Date().toISOString(),
        entry: {
          id: "120",
          date: new Date().toISOString(),
          referrer: terseUsersMockData[0],
          invitee: terseUsersMockData[2],
        },
      },
      {
        type: TimeLineEntryKind.NewTeamMemberNotice,
        shortTitle: "New team member - 01/01/2000",
        date: new Date().toISOString(),
        entry: {
          ...terseUsersMockData[0],
          status: "Creator",
          joinDate: new Date().toISOString(),
        },
      },
    ],
  },
  userEvents: [
    {
      type: TimeLineEntryKind.InvitationSentToCurrentUser,
      shortTitle: "Team invite",
      date: new Date().toISOString(),
      entry: {
        id: "130",
        date: new Date().toISOString(),
        team: teamsMockData[0],
        referrer: terseUsersMockData[2],
      },
    },
    {
      type: TimeLineEntryKind.JoinRequestSentByCurrentUser,
      shortTitle: "Team invite",
      date: new Date().toISOString(),
      entry: {
        id: "140",
        date: new Date().toISOString(),
        team: teamsMockData[0],
      },
    },
  ],
};
