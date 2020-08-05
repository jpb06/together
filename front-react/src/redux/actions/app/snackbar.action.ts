import {
    ReduxActionContext as Context, ReduxActionModifiers as Modifier, ReduxActionType as Type,
    SnackbarType
} from "../../../types/redux";

export const showErrorAction = (text: string) => ({
  type: `${Type.Snackbar}-${Modifier.Saga}_*`,
  payload: {
    isOpen: true,
    type: SnackbarType.Error,
    text,
  },
});

export const showSnackbarAction = (
  actionType: string,
  context: Context,
  text: string
) => ({
  type: `${Type.Snackbar}-${Modifier.Saga}_${context}`,
  payload: {
    isOpen: true,
    type: SnackbarType.Error,
    text,
    relatedAction: actionType,
  },
});

export const clearSnackbarAction = () => ({
  type: Type.ClearSnackbar,
});
