import {
    ActionWithPayload, DailyAlterationBeginPayload, DailyFeedbackType, DailyStepFeedback,
    ReduxActionType as Type
} from "../../../types/redux";
import { Daily } from "../../../types/shared";
import { isSuccess } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";
import {
    asFeedbackAction, getFeedbackTypeFor, initDailyStep, setDailyStep
} from "./daily.feedback.logic";

const dailyUnforeseenFeedbackReducer = (
  state: DailyStepFeedback = initialState.dailyUnforeseenTicketsFeedback,
  action: ActionWithPayload<
    Daily | DailyFeedbackType | DailyAlterationBeginPayload
  >
) => {
  if (isSuccess(action.type, Type.GetDaily)) {
    const daily = action.payload as Daily;
    return initDailyStep(daily.unforeseenTickets.length > 0, false);
  }

  const feedbackAction = asFeedbackAction(action);
  const actionType = getFeedbackTypeFor(feedbackAction, [
    DailyFeedbackType.AddUnforeseenTicket,
    DailyFeedbackType.RemoveUnforeseenTicket,
  ]);
  if (!actionType) return state;

  return setDailyStep(feedbackAction);
};

export default dailyUnforeseenFeedbackReducer;
