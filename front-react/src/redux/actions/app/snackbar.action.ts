import {
    ReduxActionContext as Context, ReduxActionModifiers as Modifier, ReduxActionType as Type,
    SnackbarData, SnackbarType
} from "../../../types/redux";
import { sagaPayloadAction } from "../generic/payload.action";

export const showErrorAction = (text: string) => ({
  type: `${Type.Snackbar}_${Modifier.Saga}_*`,
  payload: {
    isOpen: true,
    type: SnackbarType.Error,
    text,
  },
});

export const showSnackbarAction = (
  actionType: Type,
  context: Context,
  text: string
) =>
  sagaPayloadAction<SnackbarData>(Type.Snackbar, context, {
    isOpen: true,
    type: SnackbarType.Error,
    text,
    relatedAction: actionType,
  });

export const clearSnackbarAction = () => ({
  type: Type.ClearSnackbar,
});
