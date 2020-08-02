import { ReduxActionContext, ReduxActionType } from "../../types/redux";
import { RootState } from "../store/root.state";

export const recentActionFor = (
  type: ReduxActionType,
  context: ReduxActionContext
) => (state: RootState) =>
  state.recentActions.filter(
    (el) => el.type === type && el.context === context
  );

export const recentActionOutcomeFor = (
  type: ReduxActionType,
  context: ReduxActionContext
) => (state: RootState) =>
  state.recentActions.filter(
    (el) =>
      el.type === type &&
      el.context === context &&
      el.hasSucceeded !== undefined
  );
