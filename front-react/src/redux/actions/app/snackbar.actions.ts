import {
    ReduxActionContext as Context, ReduxActionModifiers as Modifier, ReduxActionType as Type,
    SnackbarData, SnackbarKind
} from "../../../types/redux";
import { sagaPayloadAction } from "../generic/payload.action";

export const showSnackbarAction = (
  text: string,
  type: SnackbarKind = SnackbarKind.Error
) => ({
  type: `${Type.Snackbar}_${Modifier.Saga}_*`,
  payload: {
    isOpen: true,
    type,
    text,
  },
});

export const showErrorAction = (
  actionType: string,
  context: Context,
  text: string
) =>
  sagaPayloadAction<SnackbarData>(Type.Snackbar, context, {
    isOpen: true,
    type: SnackbarKind.Error,
    text,
    relatedAction: actionType,
  });

export const clearSnackbarAction = () => ({
  type: Type.ClearSnackbar,
});
