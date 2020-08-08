import { put } from "redux-saga/effects";

import { ActionWithPayload, ReduxActionContext as Context } from "../../../types/redux";
import { showErrorAction, showSnackbarAction } from "../../actions";
import { getContextFrom } from "../../identifiers/get.context.from.action";

export function* executeSaga<TParam>(
  task: (params: TParam, context: Context) => void,
  action: ActionWithPayload<any>
) {
  let context;
  try {
    context = getContextFrom(action);
  } catch (error) {
    yield put(showErrorAction(error.message));
    return;
  }

  try {
    yield task(action.payload, context);
  } catch (error) {
    yield put(showSnackbarAction(action.type, context, error.message));
  }
}
