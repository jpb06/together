import { initialState } from "../../store/root.state";
import { ActionWithPayload } from "../../actions/util/generic.actions";
import Daily from "../../../types/daily.type";
import { GET_DAILY_SUCCESS } from "../../actions/util/action.types";
import {
  DailyFeedbackType,
  DailyAlterationBeginPayload,
} from "../../actions/begin.api.call.action";
import {
  initDailyStep,
  setDailyStep,
  getActionType,
  asFeedbackAction,
} from "../../logic/daily.feedback.logic";
import { DailyStepFeedback } from "../../types/daily.feedback.type";

const dailyUnforeseenFeedbackReducer = (
  state: DailyStepFeedback = initialState.dailyUnforeseenTicketsFeedback,
  action: ActionWithPayload<
    string,
    Daily | DailyFeedbackType | DailyAlterationBeginPayload
  >
) => {
  if (action.type === GET_DAILY_SUCCESS) {
    const daily = action.payload as Daily;
    return initDailyStep(daily.unforeseenTickets.length > 0, false);
  }

  const feedbackAction = asFeedbackAction(action);
  const actionType = getActionType(feedbackAction, [
    DailyFeedbackType.AddUnforeseenTicket,
    DailyFeedbackType.RemoveUnforeseenTicket,
  ]);
  if (!actionType) return state;

  return setDailyStep(feedbackAction);
};

export default dailyUnforeseenFeedbackReducer;
