import { Action } from "redux";
import { ActionWithPayload } from "../../types/action.payloads";

export function action<TPayload>(
  type: string,
  payload: TPayload
): ActionWithPayload<string, TPayload> {
  return { type, payload };
}
export function notice(type: string): Action {
  return { type };
}
