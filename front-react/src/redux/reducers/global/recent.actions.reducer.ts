import {
    ActionWithPayload, RecentTask, ReduxActionModifiers as Modifier, ReduxActionType as Type
} from "../../../types/redux";
import { RecentAction } from "../../../types/redux";
import { extractActionTypeParts } from "../../identifiers/actions.reverse.mapping.identifiers";
import { isSaga } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";

const isMatchingAction = (
  actionType: string,
  recentAction: RecentAction | null
) =>
  recentAction
    ? recentAction.tasks.some(
        (task) =>
          actionType.startsWith(task.type.valueOf()) &&
          task.hasSucceeded === undefined
      ) && actionType.endsWith(recentAction.context.valueOf())
    : false;

const updateTasks = (
  tasks: Array<RecentTask>,
  actionType: Type,
  hasSucceeded: boolean
) =>
  tasks.map((task) =>
    actionType.startsWith(task.type) ? { ...task, hasSucceeded } : task
  );

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
    isMatchingAction(action.type, lastAction)
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
    isMatchingAction(action.type, lastAction)
  ) {
    return {
      ...(lastAction as RecentAction),
      tasks: updateTasks(
        (lastAction as RecentAction).tasks,
        action.type,
        false
      ),
    };
  }

  // new pending action
  if (isSaga(action.type) && !action.type.includes(Type.Snackbar)) {
    const parts = extractActionTypeParts(action);

    if (parts) {
      return {
        tasks: parts.types.map((type) => ({
          type,
          hasSucceeded: undefined,
        })),
        context: parts.context,
      };
    }
  }

  return lastAction;
};

export default lastActionReducer;
