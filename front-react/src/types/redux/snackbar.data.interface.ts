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
}
