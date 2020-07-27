import { Daily } from "../../../shared/types";
import { getDailies } from "../dbase/fetch.mock.db";
import { mongoObjectId } from "./objectid";

export const getOrCreateDaily = (teamId: string, date: Date): Daily => {
  const dailies = getDailies();

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  let daily = dailies.find(
    (el) =>
      el.teamId === teamId &&
      el.day === day &&
      el.month === month &&
      el.year === year
  );

  if (!daily) {
    daily = {
      id: mongoObjectId(),
      teamId,
      day,
      month,
      year,
      durationIndicator: "",
      unforeseenTickets: [],
      doneTickets: [],
      subjects: [],
      feelings: [],
    };
  }

  return daily;
};
