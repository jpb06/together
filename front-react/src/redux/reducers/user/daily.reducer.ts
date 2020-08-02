import { Daily } from "../../../../../shared/types";
import { ActionWithPayload, ReduxActionType as Type } from "../../../types/redux";
import { isSuccess } from "../../actions/generic/action.checks";
import { isSucceededDailyAction } from "../../identifiers/daily.action.identifier";
import { initialState } from "../../store/root.state";

interface DailyAlterationPayload {
  data: any;
}

const dailyReducer = (
  state: Daily | null = initialState.daily,
  action: ActionWithPayload<Daily | DailyAlterationPayload>
) => {
  if (isSuccess(action.type, Type.GetDaily)) {
    return action.payload as Daily;
  }

  if (isSucceededDailyAction(action)) {
    const daily = state as Daily;
    const payload = action.payload as DailyAlterationPayload;

    if (isSuccess(action.type, Type.DailyDuration)) {
      return { ...daily, durationIndicator: payload.data };
    }

    if (isSuccess(action.type, Type.AddDoneTicket)) {
      return {
        ...daily,
        doneTickets: [...daily.doneTickets, payload.data],
      };
    }

    if (isSuccess(action.type, Type.RemoveDoneTicket)) {
      return {
        ...daily,
        doneTickets: daily.doneTickets.filter((el) => el.name !== payload.data),
      };
    }

    if (isSuccess(action.type, Type.AddUnforeseenTicket)) {
      return {
        ...daily,
        unforeseenTickets: [...daily.unforeseenTickets, payload.data],
      };
    }

    if (isSuccess(action.type, Type.RemoveUnforeseenTicket)) {
      return {
        ...daily,
        unforeseenTickets: daily.unforeseenTickets.filter(
          (el) => el.name !== payload.data
        ),
      };
    }

    if (isSuccess(action.type, Type.AddFeeling)) {
      return {
        ...daily,
        feelings: [...daily.feelings, payload.data],
      };
    }

    if (isSuccess(action.type, Type.RemoveFeeling)) {
      return {
        ...daily,
        feelings: daily.feelings.filter((el) => el.id !== payload.data),
      };
    }

    if (isSuccess(action.type, Type.AddSubject)) {
      return {
        ...daily,
        subjects: [...daily.subjects, payload.data],
      };
    }

    if (isSuccess(action.type, Type.RemoveSubject)) {
      return {
        ...daily,
        subjects: daily.subjects.filter((el) => el.id !== payload.data),
      };
    }
  }

  return state;
};

export default dailyReducer;
