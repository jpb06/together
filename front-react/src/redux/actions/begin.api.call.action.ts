import { notice, action } from "./util/generic.actions";
import { BEGIN_API_CALL, BEGIN_API_CALL_DAILY } from "./util/action.types";
import { Action } from "redux";

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

const beginApiCallAction = (): Action => notice(BEGIN_API_CALL);

export interface DailyAlterationBeginPayload {
  type: DailyFeedbackType;
  term?: string;
}

const beginDailyApiCallAction = (
  payload: DailyAlterationBeginPayload
): Action => action(BEGIN_API_CALL_DAILY, payload);

export default beginApiCallAction;
export { beginDailyApiCallAction };
