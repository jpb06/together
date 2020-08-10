import {
    ActionWithPayload, ReduxActionContext as Context, ReduxActionModifiers as Modifier,
    ReduxActionType as Type, SnackbarData
} from "../../types/redux";

export const isIn = (context: Context, actionType: string) =>
  actionType.endsWith(`_${context}`);

export const isSuccess = (actionType: string) =>
  actionType.includes(`_${Modifier.Success}_`);

export const isSuccessIn = (context: Context, actionType: string) =>
  actionType.endsWith(`_${Modifier.Success}_${context}`);

export const isSuccessFor = (
  type: Type,
  actionType: string,
  context?: Context
) =>
  context
    ? actionType === `${type}_${Modifier.Success}_${context}`
    : actionType.startsWith(`${type}_${Modifier.Success}`);

export const isSuccessOrFailureIn = (context: Context, actionType: string) =>
  isSuccessIn(context, actionType) ||
  actionType === `${Type.Snackbar}_${Modifier.Saga}_${context}`;

export const isSaga = (actionType: string) =>
  actionType.includes(`_${Modifier.Saga}_`);

export const isSagaFor = (type: Type, actionType: string) =>
  actionType.startsWith(`${type}_${Modifier.Saga}`);

export const isFailedIn = (context: Context, actionType: string) =>
  isSagaFor(Type.Snackbar, actionType) && isIn(context, actionType);

export const isFailedFor = (
  type: Type,
  action: ActionWithPayload<SnackbarData>
) =>
  isSagaFor(Type.Snackbar, action.type) &&
  action.payload.relatedAction === type;
