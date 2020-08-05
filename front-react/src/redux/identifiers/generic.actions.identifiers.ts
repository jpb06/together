import {
    ReduxActionContext as Context, ReduxActionModifiers as Modifier, ReduxActionType as Type
} from "../../types/redux";

export const isSuccess = (actionType: string, type: Type, context?: Context) =>
  context
    ? actionType === `${type}-${Modifier.Success}_${context}`
    : actionType.startsWith(`${type}-${Modifier.Success}`);

export const isSaga = (actionType: string, type: Type) =>
  actionType.startsWith(`${type}-${Modifier.Saga}`);

export const isFailed = (actionType: string, context: Context) =>
  isSaga(actionType, Type.Snackbar) && actionType.endsWith(`_${context}`);
