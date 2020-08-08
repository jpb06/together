import { recentActionsIn } from "../redux/selectors";
import { ApplicationState, ReduxActionContext as Context } from "../types/redux";
import { useRootSelector } from "./use.root.selector";

export const useAppStatus = (context: Context): ApplicationState => {
  const actions = useRootSelector(recentActionsIn(context));

  if (
    actions.every((el) => el.context === context && el.hasSucceeded === true)
  ) {
    return ApplicationState.Available;
  }

  if (
    actions.some((el) => el.context === context && el.hasSucceeded === false)
  ) {
    return ApplicationState.Errored;
  }

  return ApplicationState.Busy;
};
