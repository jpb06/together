import { ReduxActionContext as Context } from "../../types/redux";
import { RootState } from "../store/root.state";

export const isAppReadyIn = (context: Context) => (state: RootState) => {
  if (!state.lastAction) return true;

  return (
    state.lastAction.context === context &&
    state.lastAction.tasks.every((task) => task.hasSucceeded === true)
  );
};

export const isAppBusyIn = (context: Context) => (state: RootState) => {
  if (!state.lastAction) return false;

  return (
    state.lastAction.context === context &&
    state.lastAction.tasks.some((task) => task.hasSucceeded === undefined)
  );
};

export const isAppErroredIn = (context: Context) => (state: RootState) => {
  if (!state.lastAction) return false;

  return (
    state.lastAction.context === context &&
    state.lastAction.tasks.some((task) => task.hasSucceeded === false)
  );
};
