import { Action } from "redux";
import { takeEvery } from "redux-saga/effects";

import { ReduxActionModifiers as Modifier, ReduxActionType as Type } from "../../../types/redux";
import { displaySnackbarTask } from "../../tasks/app/display.snackbar.task";

export function* watchSnackbar() {
  yield takeEvery(
    (action: Action) =>
      action.type.startsWith(`${Type.Snackbar}-${Modifier.Saga}_`),
    displaySnackbarTask
  );
}
