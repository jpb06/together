import { Daily } from "../../../stack-shared-code/types";
import {
    ActionWithPayload, ReduxActionContext, ReduxActionType as Type
} from "../../../types/redux";
import { isSuccessFor, isSuccessIn } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";

const dailyReducer = (
  state: Daily | null = initialState.daily,
  action: ActionWithPayload<any>
): Daily | null => {
  if (isSuccessFor(Type.GetDaily, action.type)) {
    return action.payload as Daily;
  }

  if (isSuccessIn(ReduxActionContext.Daily, action.type)) {
    const daily = state as Daily;

    if (isSuccessFor(Type.DailyDuration, action.type)) {
      return { ...daily, durationIndicator: action.payload };
    }

    if (isSuccessFor(Type.AddDoneTicket, action.type)) {
      return {
        ...daily,
        doneTickets: [...daily.doneTickets, action.payload],
      };
    }

    if (isSuccessFor(Type.RemoveDoneTicket, action.type)) {
      return {
        ...daily,
        doneTickets: daily.doneTickets.filter(
          (el) => el.name !== action.payload
        ),
      };
    }

    if (isSuccessFor(Type.AddUnforeseenTicket, action.type)) {
      return {
        ...daily,
        unforeseenTickets: [...daily.unforeseenTickets, action.payload],
      };
    }

    if (isSuccessFor(Type.RemoveUnforeseenTicket, action.type)) {
      return {
        ...daily,
        unforeseenTickets: daily.unforeseenTickets.filter(
          (el) => el.name !== action.payload
        ),
      };
    }

    if (isSuccessFor(Type.AddFeeling, action.type)) {
      return {
        ...daily,
        feelings: [...daily.feelings, action.payload],
      };
    }

    if (isSuccessFor(Type.RemoveFeeling, action.type)) {
      return {
        ...daily,
        feelings: daily.feelings.filter((el) => el.id !== action.payload),
      };
    }

    if (isSuccessFor(Type.AddSubject, action.type)) {
      return {
        ...daily,
        subjects: [...daily.subjects, action.payload],
      };
    }

    if (isSuccessFor(Type.RemoveSubject, action.type)) {
      return {
        ...daily,
        subjects: daily.subjects.filter((el) => el.id !== action.payload),
      };
    }
  }

  return state;
};

export default dailyReducer;
