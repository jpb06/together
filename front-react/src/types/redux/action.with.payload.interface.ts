import { Action } from "redux";

export interface ActionWithPayload<TPayload> extends Action<string> {
  payload: TPayload;
}
