import { delay, put, select, takeEvery } from "redux-saga/effects";

import {
    ActionWithPayload, ReduxActionModifiers as Modifier, ReduxActionType as Type, SnackbarData
} from "../../../types/redux";
import { payloadAction } from "../../actions/generic/payload.action";
import { isSnackbarOpen } from "../../selectors/is.snackbar.open.selector";

export function* displaySnackbar(action: ActionWithPayload<SnackbarData>) {
  const isOpen = yield select(isSnackbarOpen);

  if (isOpen) {
    yield put(payloadAction(Type.ClearSnackbar));
    yield delay(500);
  }

  yield put(payloadAction(Type.Snackbar, action.payload));
}

export function* watchSnackbar() {
  yield takeEvery(`${Type.Snackbar}-${Modifier.Saga}_*`, displaySnackbar);
}
