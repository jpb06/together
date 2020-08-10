import { ReduxActionType } from "./redux.action.types";

export enum SnackbarKind {
  Success,
  Error,
  Warning,
  Info,
}

export interface SnackbarData {
  isOpen: boolean;
  type: SnackbarKind;
  text: string;
  relatedAction?: ReduxActionType;
}
