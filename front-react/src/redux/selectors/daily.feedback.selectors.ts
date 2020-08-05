import { RootState } from "../store/root.state";

export const dailyDurationFeedbackSelector = (state: RootState) =>
  state.dailyDurationFeedback;

export const dailyUnforeseenTicketsFeedbackSelector = (state: RootState) =>
  state.dailyUnforeseenTicketsFeedback;

export const dailyDoneTicketsFeedbackSelector = (state: RootState) =>
  state.dailyDoneTicketsFeedback;

export const dailySubjectsFeedbackSelector = (state: RootState) =>
  state.dailySubjectsFeedback;

export const dailyFeelingsFeedbackSelector = (state: RootState) =>
  state.dailyFeelingsFeedback;

export const dailyFeedbackSelector = (state: RootState) => ({
  dailyDuration: state.dailyDurationFeedback,
  unforeseenTickets: state.dailyUnforeseenTicketsFeedback,
  doneTickets: state.dailyDoneTicketsFeedback,
  subjects: state.dailySubjectsFeedback,
  feelings: state.dailyFeelingsFeedback,
});
