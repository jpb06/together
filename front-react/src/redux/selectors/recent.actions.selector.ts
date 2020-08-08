import { ReduxActionContext as Context, ReduxActionType as Type } from "../../types/redux";
import { RootState } from "../store/root.state";

export const recentActionsIn = (context: Context) => (state: RootState) =>
  state.recentActions.filter((el) => el.context === context);

export const recentActionsFor = (type: Type) => (state: RootState) =>
  state.recentActions.filter((el) => el.type === type);
