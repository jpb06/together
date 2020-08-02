import { put, take } from "redux-saga/effects";

import {
    ApplicationStatus as Status, ReduxActionContext as Context, ReduxActionModifiers as Modifier,
    ReduxActionType as Type
} from "../../../types/redux";
import { appStateAction } from "../../actions";

export function* modalStatusSaga() {
  while (true) {
    yield take([`*-${Context.Modal}`]);
    yield put(appStateAction(Status.BusyModal));

    yield take([
      `${Type.Snackbar}-${Modifier.Saga}_${Context.Modal}`,
      `*-${Modifier.Success}_${Context.Modal}`,
    ]);
    yield put(appStateAction(Status.Available));
  }
}
