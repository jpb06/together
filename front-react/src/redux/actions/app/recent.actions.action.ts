import { ReduxActionType as Type } from "../../../types/redux";
import { payloadAction } from "../generic/payload.action";

export const clearActionsHistoryAction = () =>
  payloadAction(Type.ClearRecentActions);
