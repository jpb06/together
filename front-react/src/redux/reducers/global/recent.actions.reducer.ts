import { pascalCased } from "../../../logic/string.util";
import {
    ActionWithPayload, ReduxActionContext as Context, ReduxActionModifiers as Modifier,
    ReduxActionType as Type
} from "../../../types/redux";
import { RecentAction } from "../../../types/redux";
import { isSaga } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";

const isMatchingAction = (actionType: string, recentAction: RecentAction) =>
  actionType.startsWith(recentAction.type.valueOf()) &&
  actionType.endsWith(recentAction.context.valueOf());

const recentActionsReducer = (
  recentActions: Array<RecentAction> = initialState.recentActions,
  action: ActionWithPayload<any>
) => {
  // clear items
  if (action.type === Type.ClearRecentActions) {
    return [];
  }

  // success
  if (action.type.includes(`-${Modifier.Success}_`)) {
    return recentActions.map((el) =>
      isMatchingAction(action.type, el) ? { ...el, hasSucceeded: true } : el
    ) as RecentAction[];
  }

  // failed
  if (
    action.type.startsWith(`${Type.Snackbar}-${Modifier.Saga}_`) &&
    action.payload.relatedAction
  ) {
    return recentActions.map((el) =>
      isMatchingAction(action.type, el) ? { ...el, hasSucceeded: false } : el
    ) as RecentAction[];
  }

  // new pending action
  if (isSaga(action.type) && !action.type.includes(Type.Snackbar)) {
    const underscored = action.type.split("_");
    const context = pascalCased(underscored.pop() || "");

    if (context in Context && underscored.length === 1) {
      const chunks = underscored[0].split("-");
      chunks.pop(); // modifier
      const type = chunks.reduce(
        (prev, curr) => `${prev}${pascalCased(curr)}`,
        ""
      );

      if (type in Type) {
        return [
          ...recentActions,
          {
            type: Type[type as keyof typeof Type],
            context: Context[context as keyof typeof Context],
            hasSucceeded: undefined,
          },
        ] as RecentAction[];
      }
    }
  }

  return recentActions;
};

export default recentActionsReducer;
