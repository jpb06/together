import { delay, put, select } from "redux-saga/effects";

import { ActionWithPayload, ReduxActionType as Type, SnackbarData } from "../../../types/redux";
import { payloadAction } from "../../actions";
import { isSnackbarOpen } from "../../selectors";

export function* displaySnackbarTask(action: ActionWithPayload<SnackbarData>) {
  const isOpen: boolean = yield select(isSnackbarOpen);

  if (isOpen) {
    yield put(payloadAction(Type.ClearSnackbar));
    yield delay(500);
  }

  yield put(payloadAction(Type.Snackbar, action.payload));
}
