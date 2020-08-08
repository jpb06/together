import { ReduxActionContext as Context } from "../../types/redux";
import { RootState } from "../store/root.state";

export const isAppReadyIn = (context: Context) => (state: RootState) =>
  state.recentActions.every(
    (el) => el.context === context && el.hasSucceeded === true
  );

export const isAppBusyIn = (context: Context) => (state: RootState) =>
  state.recentActions.some(
    (el) => el.context === context && el.hasSucceeded === undefined
  );

export const isAppErroredIn = (context: Context) => (state: RootState) =>
  state.recentActions.some(
    (el) => el.context === context && el.hasSucceeded === false
  );
