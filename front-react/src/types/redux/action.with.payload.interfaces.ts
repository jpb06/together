import { Action } from "redux";
import { ReduxActionType } from "./redux.action.types";
import { DailyFeedbackType } from "./daily.alteration.payload.interface";

export interface ActionWithPayload<TPayload> extends Action<ReduxActionType> {
  payload: TPayload;
}

export interface DailyIsolatedPayload<TData> extends Action<DailyFeedbackType> {
  error?: any;
  data?: TData;
}
