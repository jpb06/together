import { initialState } from "../store/root.state";
import {
  ActionWithPayload,
  DailyIsolatedPayload,
} from "../actions/util/generic.actions";
import {
  GET_DAILY_SUCCESS,
  DAILY_SUCCESS_ISOLATED,
} from "../actions/util/action.types";
import Daily from "../../types/daily.type";
import { DailyFeedbackType } from "../actions/begin.api.call.action";

const dailyReducer = (
  state: Daily | null = initialState.daily,
  action: ActionWithPayload<string, Daily | DailyIsolatedPayload>
) => {
  if (action.type === GET_DAILY_SUCCESS) {
    return action.payload as Daily;
  }

  if (action.type === DAILY_SUCCESS_ISOLATED) {
    const payload = action.payload as DailyIsolatedPayload;

    const daily = state as Daily;

    switch (payload.type) {
      case DailyFeedbackType.Duration:
        return { ...daily, durationIndicator: payload.data };
      case DailyFeedbackType.AddDoneTicket:
        return {
          ...daily,
          doneTickets: [...daily.doneTickets, payload.data],
        };
      case DailyFeedbackType.RemoveDoneTicket:
        return {
          ...daily,
          doneTickets: daily.doneTickets.filter(
            (el) => el.name !== payload.data
          ),
        };
      case DailyFeedbackType.AddUnforeseenTicket:
        return {
          ...daily,
          unforeseenTickets: [...daily.unforeseenTickets, payload.data],
        };
      case DailyFeedbackType.RemoveUnforeseenTicket:
        return {
          ...daily,
          unforeseenTickets: daily.unforeseenTickets.filter(
            (el) => el.name !== payload.data
          ),
        };
      case DailyFeedbackType.AddFeeling:
        return {
          ...daily,
          feelings: [...daily.feelings, payload.data],
        };
      case DailyFeedbackType.RemoveFeeling:
        return {
          ...daily,
          feelings: daily.feelings.filter((el) => el.id !== payload.data),
        };
      case DailyFeedbackType.AddSubject:
        return {
          ...daily,
          subjects: [...daily.subjects, payload.data],
        };
      case DailyFeedbackType.RemoveSubject:
        return {
          ...daily,
          subjects: daily.subjects.filter((el) => el.id !== payload.data),
        };
    }
  }

  return state;
};

export { dailyReducer };
