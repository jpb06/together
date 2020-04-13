import { DailyStepFeedback, initialState } from "../../store/root.state";
import { ActionWithPayload } from "../../actions/util/generic.actions";
import Daily from "../../../types/daily.type";
import {
  GET_DAILY_SUCCESS,
  BEGIN_API_CALL_DAILY,
  DAILY_SUCCESS_ISOLATED,
  DAILY_FAILURE_ISOLATED,
  isDailyIsolatedFeedback,
} from "../../actions/util/action.types";
import {
  DailyAlterationBeginPayload,
  DailyFeedbackType,
} from "../../actions/begin.api.call.action";
import { initDailyDurationStep } from "../../logic/daily.feedback.logic";

const isActionValid = (action: ActionWithPayload<string, any>): boolean => {
  if (
    action.type !== BEGIN_API_CALL_DAILY &&
    !isDailyIsolatedFeedback(action.type)
  )
    return false;

  const payload = action.payload as DailyAlterationBeginPayload;
  if (payload.type !== DailyFeedbackType.Duration) return false;

  return true;
};

const dailyDurationFeedbackReducer = (
  state: DailyStepFeedback = initialState.dailyDurationFeedback,
  action: ActionWithPayload<
    string,
    Daily | DailyFeedbackType | DailyAlterationBeginPayload
  >
) => {
  if (action.type === GET_DAILY_SUCCESS) {
    const daily = action.payload as Daily;
    return initDailyDurationStep(daily.durationIndicator.length > 0, false);
  }

  const isValid = isActionValid(action);
  if (!isValid) return state;

  switch (action.type) {
    case BEGIN_API_CALL_DAILY:
      return initDailyDurationStep(false, true);
    case DAILY_SUCCESS_ISOLATED:
      return initDailyDurationStep(true, false);
    case DAILY_FAILURE_ISOLATED:
      return initDailyDurationStep(false, false);
    default:
      return state;
  }
};

export { dailyDurationFeedbackReducer };
