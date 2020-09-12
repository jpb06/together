import { Daily } from "../../types/shared";
import { teamsMockData } from "./teams.mock.data";

export const dailyMockData: Daily = {
  id: "34",
  teamId: teamsMockData[0].id,
  day: 1,
  month: 1,
  year: 2000,
  doneTickets: [],
  unforeseenTickets: [],
  feelings: [],
  subjects: [],
  durationIndicator: "0-15",
};
