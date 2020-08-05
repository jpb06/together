import { Action } from "redux";

import {
    ActionWithPayload, ReduxActionContext as Context, ReduxActionType as Type
} from "../../types/redux";
import { isFailed, isSaga, isSuccess } from "./generic.actions.identifiers";

export const isPendingDailyAction = (action: ActionWithPayload<any>) =>
  isSaga(action.type, Type.AddDoneTicket) ||
  isSaga(action.type, Type.AddUnforeseenTicket) ||
  isSaga(action.type, Type.AddFeeling) ||
  isSaga(action.type, Type.AddSubject) ||
  isSaga(action.type, Type.RemoveFeeling) ||
  isSaga(action.type, Type.RemoveSubject) ||
  isSaga(action.type, Type.RemoveDoneTicket) ||
  isSaga(action.type, Type.RemoveUnforeseenTicket) ||
  isSaga(action.type, Type.DailyDuration);

export const isSucceededDailyAction = (action: Action) =>
  isSuccess(action.type, Type.AddDoneTicket) ||
  isSuccess(action.type, Type.AddUnforeseenTicket) ||
  isSuccess(action.type, Type.AddFeeling) ||
  isSuccess(action.type, Type.AddSubject) ||
  isSuccess(action.type, Type.RemoveFeeling) ||
  isSuccess(action.type, Type.RemoveSubject) ||
  isSuccess(action.type, Type.RemoveDoneTicket) ||
  isSuccess(action.type, Type.RemoveUnforeseenTicket) ||
  isSuccess(action.type, Type.DailyDuration);

export const isFailedDailyAction = (action: ActionWithPayload<any>) =>
  isFailed(action.type, Context.Daily);
