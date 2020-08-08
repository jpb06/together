import { takeLeading } from "redux-saga/effects";

import {
    ActionWithPayload, ReduxActionContext as Context, ReduxActionType as Type
} from "../../../types/redux";
import { executeSaga } from "./execute.saga.helper";
import { getSagasFor } from "./get.sagas.for.helper";

export function* safeTakeLeading<TParam>(
  actionTypes: Array<Type>,
  task: (params: TParam, context: Context) => void
) {
  yield takeLeading(
    getSagasFor(actionTypes),
    (action: ActionWithPayload<TParam>) => executeSaga(task, action)
  );
}
