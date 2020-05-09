import { initialState } from "../../store/root.state";
import Daily from "../../../types/daily.type";
import { Type, Context, Result } from "../../types/action.types";
import {
  DailyFeedbackType,
  DailyAlterationBeginPayload,
} from "../../actions/global/begin.api.call.action";
import {
  initDailyStep,
  setDailyStep,
  getActionType,
  asFeedbackAction,
} from "../../logic/daily.feedback.logic";
import { DailyStepFeedback } from "../../types/daily.feedback.type";
import { ActionWithPayload } from "../../types/action.payloads";
import { check } from "../../logic/action-types/redux.action.type.validation";

const dailyFeelingsFeedbackReducer = (
  state: DailyStepFeedback = initialState.dailyFeelingsFeedback,
  action: ActionWithPayload<
    string,
    Daily | DailyFeedbackType | DailyAlterationBeginPayload
  >
) => {
  if (
    check(action.type)
      .is(Type.getDaily)
      .for(Context.Global)
      .as(Result.Success)
      .truthy()
  ) {
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

export default dailyFeelingsFeedbackReducer;
