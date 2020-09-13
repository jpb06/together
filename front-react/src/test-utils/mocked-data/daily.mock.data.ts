import { Daily, FeelingKind, SubjectKind } from "../../types/shared";
import { teamMembersMockData } from "./team.members.mock.data";
import { teamsMockData } from "./teams.mock.data";

export const dailyMockData: Daily = {
  id: "34",
  teamId: teamsMockData[0].id,
  day: 1,
  month: 1,
  year: 2000,
  doneTickets: [
    {
      id: "40",
      creator: teamMembersMockData[0],
      name: "WEB-500",
      assignee: teamMembersMockData[1],
    },
  ],
  unforeseenTickets: [
    {
      id: "42",
      creator: teamMembersMockData[1],
      name: "WEB-900",
    },
  ],
  feelings: [
    {
      id: "58",
      creator: teamMembersMockData[0],
      type: FeelingKind.DyingInside,
      comment: "Oh no",
    },
  ],
  subjects: [
    {
      id: "58",
      creator: teamMembersMockData[0],
      type: SubjectKind.Goal,
      description: "We should test more",
    },
  ],
  durationIndicator: "0-15",
};
