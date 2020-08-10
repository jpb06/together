import { ReduxActionContext, ReduxActionType } from "./";

export interface RecentTask {
  type: ReduxActionType;
  hasSucceeded?: boolean;
}

export interface RecentAction {
  tasks: Array<RecentTask>;
  context: ReduxActionContext;
}
