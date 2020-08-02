import { put } from "redux-saga/effects";
import { isArray } from "util";

import {
    ActionWithPayload, ReduxActionContext as Context, ReduxActionModifiers as Modifier
} from "../../../types/redux";
import { showErrorAction, showSnackbarAction } from "../../actions";

const getContextFrom = (action: ActionWithPayload<any>): Context => {
  try {
    const actionContext = action.type.split("_").pop();
    const context = Context[(actionContext as string) as keyof typeof Context];

    return context;
  } catch (error) {
    throw new Error("Unable to get action context");
  }
};

export const getPatternsToTake = (actionTypes: string | Array<string>) =>
  isArray(actionTypes)
    ? actionTypes.map((type) => `${type}-${Modifier.Saga}_*`)
    : `${actionTypes}-${Modifier.Saga}_*`;

export function* executeSaga<TParam>(
  task: (params: TParam, context: Context) => void,
  action: ActionWithPayload<any>
) {
  let context;
  try {
    context = getContextFrom(action);
  } catch (error) {
    yield put(showErrorAction(error.message));
    return;
  }

  try {
    task(action.payload, context);
  } catch (error) {
    yield put(showSnackbarAction(action.type, context, error.message));
  }
}
