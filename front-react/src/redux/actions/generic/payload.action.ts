import {
    ReduxActionContext as Context, ReduxActionModifiers as Modifier, ReduxActionType as Type
} from "../../../types/redux";

export const payloadAction = <TPayload>(type: Type, payload?: TPayload) => ({
  type,
  payload,
});

export const successPayloadAction = <TPayload>(
  type: Type,
  context: Context,
  payload?: TPayload
) => ({
  type: `${type}-${Modifier.Success}_${context}`,
  payload,
});

export const sagaPayloadAction = <TPayload>(
  type: Type,
  context: Context,
  payload?: TPayload
) => ({
  type: `${type}-${Modifier.Saga}_${context}`,
  payload,
});

export const combinedPayloadAction = <TPayload>(
  types: Array<Type>,
  context: Context,
  payload?: TPayload
) => ({
  type: `${types.join(".")}-${Modifier.Saga}_${context}`,
  payload,
});
