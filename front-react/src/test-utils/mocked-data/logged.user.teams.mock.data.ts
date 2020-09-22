import { invitedUserMockData } from "./invited.user.mock.data";
import { joinRequestToCurrentTeamMockData } from "./join.request.to.current.team.mock.data";
import { teamMembersMockData } from "./team.members.mock.data";
import { teamsMockData } from "./teams.mock.data";

export const loggedUserTeamsMockData = teamsMockData.map((el) => ({
  ...el,
  members: teamMembersMockData.map((user) => ({
    ...user,
    firstName: `${el.name} ${user.firstName}`,
  })),
  invitedUsers: [invitedUserMockData],
  joinRequests: [joinRequestToCurrentTeamMockData],
  lastActivity: "",
}));
