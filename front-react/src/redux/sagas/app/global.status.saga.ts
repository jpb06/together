import { put, take } from "redux-saga/effects";

import {
    ApplicationStatus as Status, ReduxActionContext as Context, ReduxActionModifiers as Modifier,
    ReduxActionType as Type
} from "../../../types/redux";
import { appStateAction } from "../../actions";

export function* globalStatusSaga() {
  while (true) {
    yield take([`*_${Context.Global}`]);
    yield put(appStateAction(Status.BusyGlobal));

    yield take([
      `${Type.Snackbar}-${Modifier.Saga}_${Context.Global}`,
      `*-${Modifier.Success}_${Context.Global}`,
    ]);
    yield put(appStateAction(Status.Available));
  }
}
