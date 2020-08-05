import {
    ActionWithPayload, DailyFeedbackType, DailyStepFeedback, ReduxActionType as Type
} from "../../../types/redux";
import { Daily } from "../../../types/shared";
import { isSuccess } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";
import {
    asFeedbackAction, getFeedbackTypeFor, initDailyStep, setDailyStep
} from "./daily.feedback.logic";

const dailyDoneFeedbackReducer = (
  state: DailyStepFeedback = initialState.dailyDoneTicketsFeedback,
  action: ActionWithPayload<Daily | DailyFeedbackType>
) => {
  if (isSuccess(action.type, Type.GetDaily)) {
    const daily = action.payload as Daily;
    return initDailyStep(daily.doneTickets.length > 0, false);
  }

  const feedbackAction = asFeedbackAction(action);
  const actionType = getFeedbackTypeFor(feedbackAction, [
    DailyFeedbackType.AddDoneTicket,
    DailyFeedbackType.RemoveDoneTicket,
  ]);
  if (!actionType) return state;

  return setDailyStep(feedbackAction);
};

export default dailyDoneFeedbackReducer;
