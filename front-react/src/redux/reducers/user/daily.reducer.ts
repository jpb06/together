import { initialState } from "../../store/root.state";
import Daily from "../../../types/daily.type";
import { DailyFeedbackType } from "../../actions/global/begin.api.call.action";
import {
  ActionWithPayload,
  DailyIsolatedPayload,
} from "../../types/action.payloads";
import { Type, Context, Result } from "../../types/action.types";
import { check } from "../../logic/action-types/redux.action.type.validation";

const dailyReducer = (
  state: Daily | null = initialState.daily,
  action: ActionWithPayload<string, Daily | DailyIsolatedPayload>
) => {
  if (
    check(action.type)
      .is(Type.login)
      .for(Context.Global)
      .as(Result.Success)
      .truthy()
  ) {
    return null;
  }

  if (
    check(action.type)
      .is(Type.getDaily)
      .for(Context.Global)
      .as(Result.Success)
      .truthy()
  ) {
    return action.payload as Daily;
  }

  if (
    check(action.type)
      .is(Type.daily)
      .for(Context.Daily)
      .as(Result.Success)
      .truthy()
  ) {
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

export default dailyReducer;
