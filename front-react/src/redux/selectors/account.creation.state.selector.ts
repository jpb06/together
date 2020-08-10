import { RootState } from "../store/root.state";

export const accountCreationStateSelector = (state: RootState) =>
  state.accountCreationState;
