import Daily from "../types/daily.type";

export function dailyHasData(daily: Daily) {
  return (
    daily.durationIndicator.length > 0 ||
    daily.unforeseenTickets.length > 0 ||
    daily.doneTickets.length > 0 ||
    daily.subjects.length > 0 ||
    daily.feelings.length > 0
  );
}
