import {
    ActionWithPayload, ReduxActionContext as Context, ReduxActionModifiers as Modifier,
    ReduxActionType as Type
} from "../../../types/redux";
import { RecentAction } from "../../../types/redux";
import { initialState } from "../../store/root.state";

const isMatchingAction = (actionType: string, recentAction: RecentAction) =>
  actionType.startsWith(recentAction.type) &&
  actionType.endsWith(recentAction.context);

const recentActionsReducer = (
  recentActions: Array<RecentAction> = initialState.recentActions,
  action: ActionWithPayload<any>
) => {
  // clear items
  if (action.type === Type.ClearRecentActions) {
    return [];
  }

  // success
  if (action.type.includes(`-${Modifier.Success}`)) {
    return recentActions.map((el) =>
      isMatchingAction(action.type, el) ? { ...el, hasSucceeded: true } : el
    ) as RecentAction[];
  }

  // failed
  if (
    action.type.startsWith(`${Type.Snackbar}-${Modifier.Saga}`) &&
    action.payload.relatedAction
  ) {
    return recentActions.map((el) =>
      isMatchingAction(action.type, el) ? { ...el, hasSucceeded: false } : el
    ) as RecentAction[];
  }

  // new pending action
  const chunks = action.type.split("-");
  if (chunks.length >= 2) {
    const context = chunks.pop();
    const type = chunks.join("-");

    if (context && context in Context && type in Type) {
      return [
        ...recentActions,
        {
          type: [type as keyof typeof Type],
          context: Context[context as keyof typeof Context],
          hasSucceeded: undefined,
        },
      ] as RecentAction[];
    }
  }

  return recentActions;
};

export default recentActionsReducer;
