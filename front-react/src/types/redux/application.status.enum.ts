import { ReduxActionContext } from "./redux.action.context.enum";

export enum ApplicationState {
  Errored,
  Available,
  Busy,
}

export interface ApplicationStatus {
  state: ApplicationState;
  context: ReduxActionContext;
  pendingTasks: number;
}
