import { Action } from "redux";

export interface ActionWithPayload<TType extends string, TPayload>
  extends Action<TType> {
  payload: TPayload;
}

export function action<TPayload>(
  type: string,
  payload: TPayload
): ActionWithPayload<string, TPayload> {
  return { type, payload };
}
export function notice(type: string): Action {
  return { type };
}
