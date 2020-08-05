import { ApplicationStatus } from "../types/redux";
import { useRootSelector } from "./use.root.selector";

export const useAppStatus = (
  status: ApplicationStatus = ApplicationStatus.Available
): [boolean, ApplicationStatus] => {
  const appStatus = useRootSelector((state) => state.status);

  const hasRequestedStatus = appStatus === status;

  return [hasRequestedStatus, appStatus];
};
