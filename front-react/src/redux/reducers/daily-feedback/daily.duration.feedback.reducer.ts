import {
    ActionWithPayload, DailyAlterationBeginPayload, DailyFeedbackType, DailyStepFeedback,
    ReduxActionType as Type
} from "../../../types/redux";
import { Daily } from "../../../types/shared";
import {
    isFailedDailyAction, isPendingDailyAction, isSucceededDailyAction
} from "../../identifiers/daily.actions.identifiers";
import { isSuccess } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";
import { initDailyDurationStep } from "./daily.feedback.logic";

const isActionValid = (action: ActionWithPayload<any>): boolean => {
  const isPending = isPendingDailyAction(action);

  if (
    !isPending &&
    !(isSucceededDailyAction(action) || isFailedDailyAction(action))
  ) {
    return false;
  }

  const payload = action.payload as DailyAlterationBeginPayload;
  if (payload.type !== DailyFeedbackType.Duration) return false;

  return true;
};

const dailyDurationFeedbackReducer = (
  state: DailyStepFeedback = initialState.dailyDurationFeedback,
  action: ActionWithPayload<
    Daily | DailyFeedbackType | DailyAlterationBeginPayload
  >
) => {
  if (isSuccess(action.type, Type.GetDaily)) {
    const daily = action.payload as Daily;
    return initDailyDurationStep(daily.durationIndicator.length > 0, false);
  }

  const isValid = isActionValid(action);
  if (!isValid) return state;

  if (isPendingDailyAction(action)) return initDailyDurationStep(false, true);
  if (isSucceededDailyAction(action)) return initDailyDurationStep(true, false);
  if (isFailedDailyAction(action)) return initDailyDurationStep(false, false);

  return state;
};

export default dailyDurationFeedbackReducer;
