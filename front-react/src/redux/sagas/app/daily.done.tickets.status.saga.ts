import { put, take } from "redux-saga/effects";

import {
    ApplicationStatus as Status, ReduxActionContext as Context, ReduxActionModifiers as Modifier,
    ReduxActionType as Type
} from "../../../types/redux";
import { appStateAction } from "../../actions";

export function* dailyDoneTicketsStatusSaga() {
  while (true) {
    yield take([`${Type.AddDoneTicket}-${Modifier.Saga}_${Context.Daily}`]);
    yield put(appStateAction(Status.BusyAddingDoneTicket));

    yield take([
      `${Type.Snackbar}-${Modifier.Saga}_${Context.Daily}`,
      `${Type.AddDoneTicket}-${Modifier.Success}_${Context.Daily}`,
    ]);
    yield put(appStateAction(Status.Available));
  }
}
