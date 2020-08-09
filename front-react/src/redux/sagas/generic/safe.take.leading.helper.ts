import { Action } from "redux";
import { takeLeading } from "redux-saga/effects";

import {
    ActionWithPayload, ReduxActionContext as Context, ReduxActionType as Type
} from "../../../types/redux";
import { isSaga } from "../../identifiers/generic.actions.identifiers";
import { executeSaga } from "./execute.saga.helper";
import { getSagasFor } from "./get.sagas.for.helper";

export function* safeTakeLeadingFor<TParam>(
  actionTypes: Array<Type>,
  task: (params: TParam, context: Context) => void
) {
  yield takeLeading(
    getSagasFor(actionTypes),
    (action: ActionWithPayload<TParam>) => executeSaga(task, action)
  );
}

export function* safeTakeLeading<TParam>(
  type: string,
  task: (params: TParam, context: Context) => void
) {
  yield takeLeading(
    (action: Action) => isSaga(action.type) && action.type.startsWith(type),
    (action: ActionWithPayload<TParam>) => executeSaga(task, action)
  );
}
