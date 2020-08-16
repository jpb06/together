import { takeLatest } from "redux-saga/effects";

import { ReduxActionContext as Context, ReduxActionType as Type } from "../../types/redux";
import { isActionSagaBelongingTo } from "../identifiers/generic.actions.identifiers";
import { executeSaga } from "../tasks";

export function* safeTakeLatest<TParam>(
  actionTypes: Array<Type>,
  task: (params: TParam, context: Context) => void
) {
  yield takeLatest(isActionSagaBelongingTo(actionTypes), executeSaga(task));
}
