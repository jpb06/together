import {
    ActionWithPayload, RecentTask, ReduxActionContext as Context, ReduxActionModifiers as Modifier,
    ReduxActionType as Type
} from "../../../types/redux";
import { RecentAction } from "../../../types/redux";
import {
    extractActionTypeParts, getContextFrom
} from "../../identifiers/actions.reverse.mapping.identifiers";
import { isSaga } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";

const isCombinedActionLastAction = (
  actionType: string,
  tasks: Array<RecentTask>
) => {
  const types = actionType.split("|");
  return (
    types.length === tasks.length &&
    tasks.every(
      (task) => types.find((type) => type === task.type) !== undefined
    )
  );
};

const isMatchingAction = (
  actionType: string,
  context: Context | undefined = undefined,
  recentAction: RecentAction | null
) => {
  if (!recentAction) return false;

  const isInContext = context
    ? context === recentAction.context
    : actionType.endsWith(recentAction.context.valueOf());
  if (!isInContext) return false;

  if (actionType.includes("|"))
    return isCombinedActionLastAction(actionType, recentAction.tasks);

  return recentAction.tasks.some(
    (task) =>
      actionType.startsWith(task.type.valueOf()) &&
      task.hasSucceeded === undefined
  );
};

const updateTasks = (
  tasks: Array<RecentTask>,
  actionType: string,
  hasSucceeded: boolean
): Array<RecentTask> => {
  if (
    actionType.includes("|") &&
    isCombinedActionLastAction(actionType, tasks)
  ) {
    return tasks.map((task) => ({ ...task, hasSucceeded }));
  }

  return tasks.map((task) =>
    actionType.startsWith(task.type) ? { ...task, hasSucceeded } : task
  );
};

const lastActionReducer = (
  lastAction: RecentAction | null = initialState.lastAction,
  action: ActionWithPayload<any>
) => {
  // clear items
  if (action.type === Type.ClearLastAction) {
    return null;
  }

  // success
  if (
    action.type.includes(`_${Modifier.Success}_`) &&
    isMatchingAction(action.type, undefined, lastAction)
  ) {
    return {
      ...(lastAction as RecentAction),
      tasks: updateTasks((lastAction as RecentAction).tasks, action.type, true),
    };
  }

  // failed
  if (
    action.type.startsWith(`${Type.Snackbar}_${Modifier.Saga}_`) &&
    action.payload.relatedAction &&
    isMatchingAction(
      action.payload.relatedAction,
      getContextFrom(action),
      lastAction
    )
  ) {
    return {
      ...(lastAction as RecentAction),
      tasks: updateTasks(
        (lastAction as RecentAction).tasks,
        action.payload.relatedAction,
        false
      ),
    };
  }

  // new pending action
  if (isSaga(action.type) && !action.type.includes(Type.Snackbar)) {
    const parts = extractActionTypeParts(action);
    if (parts) {
      return {
        tasks: [
          ...parts.types.map((type) => ({
            type,
            hasSucceeded: undefined,
          })),
        ],
        context: parts.context,
      };
    }
  }

  return lastAction;
};

export default lastActionReducer;
