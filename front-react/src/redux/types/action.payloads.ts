import { Action } from "redux";
import { DailyFeedbackType } from "../actions/global/begin.api.call.action";

export interface ActionWithPayload<TType extends string, TPayload>
  extends Action<TType> {
  payload: TPayload;
}

export interface DailyIsolatedPayload {
  type: DailyFeedbackType;
  error?: any;
  data?: any;
}
