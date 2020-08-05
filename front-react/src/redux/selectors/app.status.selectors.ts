import { ApplicationStatus } from "../../types/redux";
import { RootState } from "../store/root.state";

export const isAppBusy = (state: RootState) =>
  state.status !== ApplicationStatus.Available &&
  state.status !== ApplicationStatus.Errored;

export const isAppBusyModal = (state: RootState) =>
  state.status === ApplicationStatus.BusyModal;

export const isAppAvailable = (state: RootState) =>
  state.status === ApplicationStatus.Available;

export const isAppErrored = (state: RootState) =>
  state.status === ApplicationStatus.Errored;
