import { ActionWithPayload, ReduxActionType as Type } from "../../../types/redux";
import { Daily } from "../../../types/shared";
import { isSucceededDailyAction } from "../../identifiers/daily.actions.identifiers";
import { isSuccessFor } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";

interface DailyAlterationPayload {
  data: any;
}

const dailyReducer = (
  state: Daily | null = initialState.daily,
  action: ActionWithPayload<Daily | DailyAlterationPayload>
) => {
  if (isSuccessFor(Type.GetDaily, action.type)) {
    return action.payload as Daily;
  }

  if (isSucceededDailyAction(action)) {
    const daily = state as Daily;
    const payload = action.payload as DailyAlterationPayload;

    if (isSuccessFor(Type.DailyDuration, action.type)) {
      return { ...daily, durationIndicator: payload.data };
    }

    if (isSuccessFor(Type.AddDoneTicket, action.type)) {
      return {
        ...daily,
        doneTickets: [...daily.doneTickets, payload.data],
      };
    }

    if (isSuccessFor(Type.RemoveDoneTicket, action.type)) {
      return {
        ...daily,
        doneTickets: daily.doneTickets.filter((el) => el.name !== payload.data),
      };
    }

    if (isSuccessFor(Type.AddUnforeseenTicket, action.type)) {
      return {
        ...daily,
        unforeseenTickets: [...daily.unforeseenTickets, payload.data],
      };
    }

    if (isSuccessFor(Type.RemoveUnforeseenTicket, action.type)) {
      return {
        ...daily,
        unforeseenTickets: daily.unforeseenTickets.filter(
          (el) => el.name !== payload.data
        ),
      };
    }

    if (isSuccessFor(Type.AddFeeling, action.type)) {
      return {
        ...daily,
        feelings: [...daily.feelings, payload.data],
      };
    }

    if (isSuccessFor(Type.RemoveFeeling, action.type)) {
      return {
        ...daily,
        feelings: daily.feelings.filter((el) => el.id !== payload.data),
      };
    }

    if (isSuccessFor(Type.AddSubject, action.type)) {
      return {
        ...daily,
        subjects: [...daily.subjects, payload.data],
      };
    }

    if (isSuccessFor(Type.RemoveSubject, action.type)) {
      return {
        ...daily,
        subjects: daily.subjects.filter((el) => el.id !== payload.data),
      };
    }
  }

  return state;
};

export default dailyReducer;
