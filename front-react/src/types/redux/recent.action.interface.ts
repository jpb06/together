import { ReduxActionContext, ReduxActionType } from "./";

export interface RecentAction {
  type: ReduxActionType;
  context: ReduxActionContext;
  hasSucceeded?: boolean;
}
