import { Action } from "redux";

import {
    ActionWithPayload, ReduxActionContext as Context, ReduxActionType as Type
} from "../../types/redux";
import { isFailedIn, isSagaFor, isSuccessFor } from "./generic.actions.identifiers";

export const isPendingDailyAction = (action: ActionWithPayload<any>) =>
  isSagaFor(Type.AddDoneTicket, action.type) ||
  isSagaFor(Type.AddUnforeseenTicket, action.type) ||
  isSagaFor(Type.AddFeeling, action.type) ||
  isSagaFor(Type.AddSubject, action.type) ||
  isSagaFor(Type.RemoveFeeling, action.type) ||
  isSagaFor(Type.RemoveSubject, action.type) ||
  isSagaFor(Type.RemoveDoneTicket, action.type) ||
  isSagaFor(Type.RemoveUnforeseenTicket, action.type) ||
  isSagaFor(Type.DailyDuration, action.type);

export const isSucceededDailyAction = (action: Action) =>
  isSuccessFor(Type.AddDoneTicket, action.type) ||
  isSuccessFor(Type.AddUnforeseenTicket, action.type) ||
  isSuccessFor(Type.AddFeeling, action.type) ||
  isSuccessFor(Type.AddSubject, action.type) ||
  isSuccessFor(Type.RemoveFeeling, action.type) ||
  isSuccessFor(Type.RemoveSubject, action.type) ||
  isSuccessFor(Type.RemoveDoneTicket, action.type) ||
  isSuccessFor(Type.RemoveUnforeseenTicket, action.type) ||
  isSuccessFor(Type.DailyDuration, action.type);

export const isFailedDailyAction = (action: ActionWithPayload<any>) =>
  isFailedIn(Context.AddingDoneTicket, action.type) ||
  isFailedIn(Context.RemovingDoneTicket, action.type) ||
  isFailedIn(Context.AddingUnforeseenTicket, action.type) ||
  isFailedIn(Context.RemovingUnforeseenTicket, action.type) ||
  isFailedIn(Context.AddingFeeling, action.type) ||
  isFailedIn(Context.RemovingFeeling, action.type) ||
  isFailedIn(Context.AddingSubject, action.type) ||
  isFailedIn(Context.RemovingSubject, action.type) ||
  isFailedIn(Context.SetDuration, action.type);
