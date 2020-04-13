import { Action } from "redux";
import { DailyFeedbackType } from "../begin.api.call.action";
import { DAILY_FAILURE_ISOLATED, DAILY_SUCCESS_ISOLATED } from "./action.types";

export interface ActionWithPayload<TType extends string, TPayload>
  extends Action<TType> {
  payload: TPayload;
}

export interface DailyIsolatedPayload {
  type: DailyFeedbackType;
  error?: any;
  data?: any;
}

export function action<TPayload>(
  type: string,
  payload: TPayload
): ActionWithPayload<string, TPayload> {
  return { type, payload };
}
export function notice(type: string): Action {
  return { type };
}

export function dailyAlterationFailure(type: DailyFeedbackType, error: any) {
  return action(DAILY_FAILURE_ISOLATED, {
    type,
    error,
  });
}

export function dailyAlterationSuccess(type: DailyFeedbackType, data: any) {
  return action(DAILY_SUCCESS_ISOLATED, {
    type,
    data,
  });
}
