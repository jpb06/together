import { initialState } from "../../store/root.state";
import Daily from "../../../types/daily.type";
import {
  DailyAlterationBeginPayload,
  DailyFeedbackType,
} from "../../actions/global/begin.api.call.action";
import { initDailyDurationStep } from "../../logic/daily.feedback.logic";
import { DailyStepFeedback } from "../../types/daily.feedback.type";
import { ActionWithPayload } from "../../types/action.payloads";
import { Context, Type, Result } from "../../types/action.types";
import { check } from "../../logic/action-types/redux.action.type.validation";
import {
  typeFor,
  beginApiCallFor,
} from "../../logic/action-types/redux.action.type.generation";

const isActionValid = (action: ActionWithPayload<string, any>): boolean => {
  const dailyContextCheck = check(action.type).for(Context.Daily);

  if (
    !dailyContextCheck.is(Type.beginApiCall).truthy() &&
    !(
      dailyContextCheck.is(Type.daily).as(Result.Failure).truthy() ||
      dailyContextCheck.is(Type.daily).as(Result.Success).truthy()
    )
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
    return initDailyDurationStep(daily.durationIndicator.length > 0, false);
  }

  const isValid = isActionValid(action);
  if (!isValid) return state;

  switch (action.type) {
    case beginApiCallFor(Context.Daily):
      return initDailyDurationStep(false, true);
    case typeFor(Type.daily, Context.Daily, Result.Success):
      return initDailyDurationStep(true, false);
    case typeFor(Type.daily, Context.Daily, Result.Failure):
      return initDailyDurationStep(false, false);
    default:
      return state;
  }
};

export default dailyDurationFeedbackReducer;
