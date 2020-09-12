import { getInitials } from "../../logic/user.util";
import { teamsMockData } from "./teams.mock.data";

export const loggedUserMockData = {
  lastName: "Yolo",
  firstName: "Bro",
  email: "yolo.bro@cool.org",
  avatarName: "",
  fullName: "Bro Yolo",
  initials: getInitials("Bro Yolo"),
  id: "23",
  teamInvites: [],
  teamJoinRequests: [],
  teams: [teamsMockData[0]],
};
