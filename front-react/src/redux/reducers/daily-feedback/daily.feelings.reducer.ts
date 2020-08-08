import {
    ActionWithPayload, DailyAlterationBeginPayload, DailyFeedbackType, DailyStepFeedback,
    ReduxActionType as Type
} from "../../../types/redux";
import { Daily } from "../../../types/shared";
import { isSuccessFor } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";
import {
    asFeedbackAction, getFeedbackTypeFor, initDailyStep, setDailyStep
} from "./daily.feedback.logic";

const dailyFeelingsFeedbackReducer = (
  state: DailyStepFeedback = initialState.dailyFeelingsFeedback,
  action: ActionWithPayload<
    Daily | DailyFeedbackType | DailyAlterationBeginPayload
  >
) => {
  if (isSuccessFor(Type.GetDaily, action.type)) {
    const daily = action.payload as Daily;
    return initDailyStep(daily.feelings.length > 0, false);
  }

  const feedbackAction = asFeedbackAction(action);
  const actionType = getFeedbackTypeFor(feedbackAction, [
    DailyFeedbackType.AddFeeling,
    DailyFeedbackType.RemoveFeeling,
  ]);
  if (!actionType) return state;

  return setDailyStep(feedbackAction);
};

export default dailyFeelingsFeedbackReducer;
