import { call, put } from "redux-saga/effects";

import {
    ActionWithPayload, ReduxActionContext as Context, ReduxActionModifiers as Modifier,
    ReduxActionType as Type
} from "../../../types/redux";
import { showErrorAction, showSnackbarAction } from "../../actions";
import { extractActionTypeParts } from "../../identifiers/actions.reverse.mapping.identifiers";

export const executeSaga = <TParam>(
  task: (params: TParam, context: Context) => void
) =>
  function* (action: ActionWithPayload<TParam>) {
    let parts:
      | { types: Array<Type>; modifier: Modifier; context: Context }
      | undefined = undefined;
    try {
      parts = yield call(extractActionTypeParts, action);
    } catch (error) {
      yield put(showSnackbarAction(error.message));
      return;
    }

    if (!parts) {
      yield put(showSnackbarAction("Unable to extract action type parts"));
    } else {
      try {
        yield call(task, action.payload, parts.context);
      } catch (error) {
        yield put(
          showErrorAction(parts.types.join("|"), parts.context, error.message)
        );
      }
    }
  };
