import { isArray } from "util";

import {
    ReduxActionContext as Context, ReduxActionModifiers as Modifier, ReduxActionType as Type
} from "../../../types/redux";

export const combineActions = (...types: Array<Type>) => `${types.join("|")}`;

export const payloadAction = <TPayload>(type: Type, payload?: TPayload) => ({
  type,
  payload,
});

export const successPayloadAction = <TPayload>(
  type: Type,
  context: Context,
  payload?: TPayload
) => ({
  type: `${type}_${Modifier.Success}_${context}`,
  payload,
});

export const sagaPayloadAction = <TPayload>(
  type: Type | Array<Type>,
  context: Context,
  payload?: TPayload
) => ({
  type: isArray(type)
    ? `${combineActions(...type)}_${Modifier.Saga}_${context}`
    : `${type}_${Modifier.Saga}_${context}`,
  payload,
});
