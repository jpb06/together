import { terseUsersMockData } from "./terse.users.mock.data";

export const invitedUserMockData = {
  id: "121",
  date: new Date().toISOString(),
  referrer: terseUsersMockData[0],
  invitee: terseUsersMockData[2],
};
