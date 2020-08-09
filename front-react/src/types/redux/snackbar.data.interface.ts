import { ReduxActionType } from "./redux.action.types";

export enum SnackbarType {
  Success,
  Error,
  Warning,
  Info,
}

export interface SnackbarData {
  isOpen: boolean;
  type: SnackbarType;
  text: string;
  relatedAction?: ReduxActionType;
}
