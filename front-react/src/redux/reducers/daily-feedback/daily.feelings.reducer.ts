import { DailyStepFeedback, initialState } from "../../store/root.state";
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

const dailyFeelingsFeedbackReducer = (
  state: DailyStepFeedback = initialState.dailyFeelingsFeedback,
  action: ActionWithPayload<
    string,
    Daily | DailyFeedbackType | DailyAlterationBeginPayload
  >
) => {
  if (action.type === GET_DAILY_SUCCESS) {
    const daily = action.payload as Daily;
    return initDailyStep(daily.feelings.length > 0, false);
  }

  const feedbackAction = asFeedbackAction(action);
  const actionType = getActionType(feedbackAction, [
    DailyFeedbackType.AddFeeling,
    DailyFeedbackType.RemoveFeeling,
  ]);
  if (!actionType) return state;

  return setDailyStep(feedbackAction);
};

export { dailyFeelingsFeedbackReducer };
