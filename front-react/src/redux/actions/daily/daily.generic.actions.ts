import { DailyFeedbackType } from "../global/begin.api.call.action";
import { action } from "../global/generic.actions";
import { Type, Context, Result } from "../../types/action.types";
import { typeFor } from "../../logic/action-types/redux.action.type.generation";

const actionType = Type.daily;

const dailyAlterationFailure = (type: DailyFeedbackType, error: any) =>
  action(typeFor(actionType, Context.Daily, Result.Failure), {
    type,
    error,
  });

const dailyAlterationSuccess = (type: DailyFeedbackType, data: any) =>
  action(typeFor(actionType, Context.Daily, Result.Success), {
    type,
    data,
  });

export { dailyAlterationFailure, dailyAlterationSuccess };
