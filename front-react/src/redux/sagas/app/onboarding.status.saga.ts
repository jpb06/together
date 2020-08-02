import { put, take } from "redux-saga/effects";

import {
    ApplicationStatus as Status, ReduxActionContext as Context, ReduxActionModifiers as Modifier,
    ReduxActionType as Type
} from "../../../types/redux";
import { appStateAction } from "../../actions";

export function* onboardingStatusSaga() {
  while (true) {
    yield take(`*-${Context.Onboarding}`);
    yield put(appStateAction(Status.BusyCreatingAccount));

    yield take([
      `${Type.Snackbar}-${Modifier.Saga}_${Context.Onboarding}`, // errors
      `*-${Modifier.Success}_${Context.Onboarding}`,
    ]);
    yield put(appStateAction(Status.Available));
  }
}
