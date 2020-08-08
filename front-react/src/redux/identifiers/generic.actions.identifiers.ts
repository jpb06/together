import {
    ReduxActionContext as Context, ReduxActionModifiers as Modifier, ReduxActionType as Type
} from "../../types/redux";

export const isIn = (context: Context, actionType: string) =>
  actionType.endsWith(`_${context}`);

export const isSuccess = (actionType: string) =>
  actionType.includes(`-${Modifier.Success}_`);

export const isSuccessIn = (context: Context, actionType: string) =>
  actionType.endsWith(`-${Modifier.Success}_${context}`);

export const isSuccessFor = (
  type: Type,
  actionType: string,
  context?: Context
) =>
  context
    ? actionType === `${type}-${Modifier.Success}_${context}`
    : actionType.startsWith(`${type}-${Modifier.Success}`);

export const isSuccessOrFailureIn = (context: Context, actionType: string) =>
  isSuccessIn(context, actionType) ||
  actionType === `${Type.Snackbar}-${Modifier.Saga}_${context}`;

export const isSaga = (actionType: string) =>
  actionType.includes(`-${Modifier.Saga}_`);

export const isSagaFor = (type: Type, actionType: string) =>
  actionType.startsWith(`${type}-${Modifier.Saga}`);

export const isFailedIn = (context: Context, actionType: string) =>
  isSagaFor(Type.Snackbar, actionType) && isIn(context, actionType);
