import { notice, action } from "./generic.actions";
import { Action } from "redux";
import { Context } from "../../types/action.types";
import { beginApiCallFor } from "../../logic/action-types/redux.action.type.generation";

export enum DailyFeedbackType {
  Unknown,
  Duration,
  AddUnforeseenTicket,
  RemoveUnforeseenTicket,
  AddDoneTicket,
  RemoveDoneTicket,
  AddSubject,
  RemoveSubject,
  AddFeeling,
  RemoveFeeling,
}

export interface DailyAlterationBeginPayload {
  type: DailyFeedbackType;
  term?: string;
}

export function beginDailyApiCallAction(
  payload: DailyAlterationBeginPayload
): Action {
  return action(beginApiCallFor(Context.Daily), payload);
}

export default function beginApiCallAction(context: Context): Action {
  return notice(beginApiCallFor(context));
}
