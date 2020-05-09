import { initialState } from "../../store/root.state";
import Daily from "../../../types/daily.type";
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
import { Type, Context, Result } from "../../types/action.types";
import { check } from "../../logic/action-types/redux.action.type.validation";

const dailySubjectsFeedbackReducer = (
  state: DailyStepFeedback = initialState.dailySubjectsFeedback,
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
    return initDailyStep(daily.subjects.length > 0, false);
  }

  const feedbackAction = asFeedbackAction(action);
  const actionType = getActionType(feedbackAction, [
    DailyFeedbackType.AddSubject,
    DailyFeedbackType.RemoveSubject,
  ]);
  if (!actionType) return state;

  return setDailyStep(feedbackAction);
};

export default dailySubjectsFeedbackReducer;
