import {
    ActionWithPayload, DailyState, ReduxActionContext as Context, ReduxActionType as Type
} from "../../../types/redux";
import { Daily } from "../../../types/shared";
import { isIn, isSuccessFor } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";
import {
    initDailyDurationStep, setDailyBlockState, setDailyStep, setDurationState
} from "./daily.state.logic";

const dailyStatusReducer = (
  state: DailyState = initialState.dailyState,
  action: ActionWithPayload<any>
): DailyState => {
  if (isSuccessFor(Type.GetDaily, action.type)) {
    const daily = action.payload as Daily;
    return {
      duration: initDailyDurationStep(daily.durationIndicator.length > 0),
      doneTickets: setDailyStep(
        state.doneTickets,
        daily.doneTickets.length > 0
      ),
      unforeseenTickets: setDailyStep(
        state.unforeseenTickets,
        daily.unforeseenTickets.length > 0
      ),
      feelings: setDailyStep(state.feelings, daily.feelings.length > 0),
      subjects: setDailyStep(state.subjects, daily.subjects.length > 0),
    };
  }

  if (!isIn(Context.Daily, action.type)) {
    return state;
  }

  return (
    setDurationState(action, state) ||
    setDailyBlockState(
      action,
      Type.AddDoneTicket,
      Type.RemoveDoneTicket,
      state,
      state.doneTickets,
      "doneTickets",
      action.payload?.ticket
    ) ||
    setDailyBlockState(
      action,
      Type.AddUnforeseenTicket,
      Type.RemoveUnforeseenTicket,
      state,
      state.unforeseenTickets,
      "unforeseenTickets",
      action.payload?.ticket
    ) ||
    setDailyBlockState(
      action,
      Type.AddFeeling,
      Type.RemoveFeeling,
      state,
      state.feelings,
      "feelings",
      action.payload?.id
    ) ||
    setDailyBlockState(
      action,
      Type.AddSubject,
      Type.RemoveSubject,
      state,
      state.subjects,
      "subjects",
      action.payload?.id
    ) ||
    state
  );
};

export default dailyStatusReducer;
