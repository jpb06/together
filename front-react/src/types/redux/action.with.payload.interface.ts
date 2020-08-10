import { Action } from "redux";

import { ReduxActionType } from "./redux.action.types";

export interface ActionWithPayload<TPayload> extends Action<ReduxActionType> {
  payload: TPayload;
}
