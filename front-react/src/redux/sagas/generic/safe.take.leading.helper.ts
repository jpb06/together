import { Action } from "redux";
import { takeLeading } from "redux-saga/effects";

import {
    ActionWithPayload, ReduxActionContext as Context, ReduxActionType
} from "../../../types/redux";
import { isSaga } from "../../identifiers/generic.actions.identifiers";
import { executeSaga, getPatternsToTake } from "./execute.saga.helper";

const match = (triggers: ReduxActionType | Array<ReduxActionType>) => (
  action: Action
) => (triggers as Array<ReduxActionType>).some((el) => isSaga(action.type, el));

export function* safeTakeLeading<TParam>(
  triggers: Array<ReduxActionType>,
  task: (params: TParam, context: Context) => void
) {
  yield takeLeading(match(triggers), (action: ActionWithPayload<TParam>) =>
    executeSaga(task, action)
  );
}

// export function* safeTakeLeading<TParam>(
//   actionType: Type | Array<Type>,
//   context: Context,
//   task: (params: TParam, context: Context) => void
// ) {
//   try {
//     yield takeLeading(
//       isArray(actionType)
//         ? actionType.map((type) => `${type}-${Modifier.Saga}_${context}`)
//         : `${actionType}-${Modifier.Saga}_${context}`,
//       (action: ActionWithPayload<TParam>) => task(action.payload, context)
//     );
//   } catch (error) {
//     yield put(showErrorSaga(context, error.message));
//   }
// }
