import { ApplicationStatus, ReduxActionType } from "../../../types/redux";

export const appStateAction = (status: ApplicationStatus) => ({
  type: ReduxActionType.ApplicationStatus,
  payload: status,
});
