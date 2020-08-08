import { Action } from "redux";
import { put, take } from "redux-saga/effects";

import { ReduxActionContext, ReduxActionType } from "../../../types/redux";
import { clearActionsHistoryAction } from "../../actions";
import { isSuccessFor } from "../../identifiers/generic.actions.identifiers";

export function* clearRecentActionsSaga() {
  yield take((action: Action) =>
    isSuccessFor(ReduxActionType.Login, action.type, ReduxActionContext.Global)
  );
  yield put(clearActionsHistoryAction());
}
