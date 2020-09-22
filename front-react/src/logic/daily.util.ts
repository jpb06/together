import { Daily } from "../stack-shared-code/types";

export const dailyHasData = (daily: Daily) =>
  daily.durationIndicator.length > 0 ||
  daily.unforeseenTickets.length > 0 ||
  daily.doneTickets.length > 0 ||
  daily.subjects.length > 0 ||
  daily.feelings.length > 0;
