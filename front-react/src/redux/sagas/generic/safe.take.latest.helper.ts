import { takeLatest } from "redux-saga/effects";

import {
    ActionWithPayload, ReduxActionContext as Context, ReduxActionType as Type
} from "../../../types/redux";
import { executeSaga } from "./execute.saga.helper";
import { getSagasFor } from "./get.sagas.for.helper";

export function* safeTakeLatest<TParam>(
  actionTypes: Array<Type>,
  task: (params: TParam, context: Context) => void
) {
  yield takeLatest(
    getSagasFor(actionTypes),
    (action: ActionWithPayload<TParam>) => executeSaga(task, action)
  );
}
