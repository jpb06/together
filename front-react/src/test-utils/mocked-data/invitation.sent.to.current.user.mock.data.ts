import { teamsMockData } from "./teams.mock.data";
import { terseUsersMockData } from "./terse.users.mock.data";

export const invitationSentToCurrentUserMockData = {
  id: "130",
  date: new Date().toISOString(),
  team: teamsMockData[0],
  referrer: terseUsersMockData[2],
};
