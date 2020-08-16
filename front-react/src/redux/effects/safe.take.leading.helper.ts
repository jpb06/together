import { takeLeading } from "redux-saga/effects";

import { ReduxActionContext as Context, ReduxActionType as Type } from "../../types/redux";
import {
    isActionSagaBelongingTo, isActionSagaFor
} from "../identifiers/generic.actions.identifiers";
import { executeSaga } from "../tasks";

export function* safeTakeLeadingFor<TParam>(
  actionTypes: Array<Type>,
  task: (params: TParam, context: Context) => void
) {
  yield takeLeading(isActionSagaBelongingTo(actionTypes), executeSaga(task));
}

export function* safeTakeLeading<TParam>(
  type: string,
  task: (params: TParam, context: Context) => void
) {
  yield takeLeading(isActionSagaFor(type), executeSaga(task));
}
