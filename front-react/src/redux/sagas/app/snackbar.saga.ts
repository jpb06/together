import { Action } from "redux";
import { takeEvery } from "redux-saga/effects";

import { ReduxActionType as Type } from "../../../types/redux";
import { isSagaFor } from "../../identifiers/generic.actions.identifiers";
import { displaySnackbarTask } from "../../tasks/app/display.snackbar.task";

export function* watchSnackbar() {
  yield takeEvery(
    (action: Action) => isSagaFor(Type.Snackbar, action.type),
    displaySnackbarTask
  );
}
