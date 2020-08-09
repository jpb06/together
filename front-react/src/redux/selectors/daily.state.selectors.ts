import { RootState } from "../store/root.state";

export const dailyDurationFeedbackSelector = (state: RootState) =>
  state.dailyState.duration;

export const dailyUnforeseenTicketsFeedbackSelector = (state: RootState) =>
  state.dailyState.unforeseenTickets;

export const dailyDoneTicketsFeedbackSelector = (state: RootState) =>
  state.dailyState.doneTickets;

export const dailySubjectsFeedbackSelector = (state: RootState) =>
  state.dailyState.subjects;

export const dailyFeelingsFeedbackSelector = (state: RootState) =>
  state.dailyState.feelings;

export const dailyFeedbackSelector = (state: RootState) => state.dailyState;
