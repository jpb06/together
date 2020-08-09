import { lastAction } from "../redux/selectors";
import { ApplicationState, ReduxActionContext as Context } from "../types/redux";
import { useRootSelector } from "./use.root.selector";

export const useAppStatus = (context: Context): ApplicationState => {
  const action = useRootSelector(lastAction);

  if (!action) {
    return ApplicationState.Available;
  }

  if (
    action.context === context &&
    action.tasks.every((task) => task.hasSucceeded === true)
  ) {
    return ApplicationState.Available;
  }

  if (
    action.context === context &&
    action.tasks.every((task) => task.hasSucceeded === false)
  ) {
    return ApplicationState.Errored;
  }

  return ApplicationState.Busy;
};
