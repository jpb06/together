import { takeLatest } from "redux-saga/effects";

import {
    ActionWithPayload, ReduxActionContext as Context, ReduxActionModifiers as Modifier
} from "../../../types/redux";
import { executeSaga, getPatternsToTake } from "./execute.saga.helper";

export function* safeTakeLatest<TParam>(
  actionTypes: string | Array<string>,
  task: (params: TParam, context: Context) => void
) {
  yield takeLatest(
    getPatternsToTake(actionTypes),
    (action: ActionWithPayload<TParam>) => executeSaga(task, action)
  );
}

// export function* safeTakeLatest<TParam>(
//   actionType: Type | Array<Type>,
//   context: Context,
//   task: (params: TParam, context: Context) => void
// ) {
//   try {
//     yield takeLatest(
//       isArray(actionType)
//         ? actionType.map((type) => `${type}-${Modifier.Saga}_${context}`)
//         : `${actionType}-${Modifier.Saga}_${context}`,
//       (action: ActionWithPayload<TParam>) => task(action.payload, context)
//     );
//   } catch (error) {
//     yield put(showErrorSaga(context, error.message));
//   }
// }
