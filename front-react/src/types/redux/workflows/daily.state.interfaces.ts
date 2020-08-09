export interface DailyGlobalFeedback {
  isValidated: boolean;
  isPending: boolean;
}

export interface DailyAddActionFeedback {
  isPending: boolean;
  isErrored: boolean;
  text: string;
}

export interface DailyDeleteActionFeedback {
  isPending: boolean;
  term: string;
}

export interface DailyStepFeedback {
  globalFeedback: DailyGlobalFeedback;
  addActionFeedback?: DailyAddActionFeedback;
  deleteActionFeedback?: DailyDeleteActionFeedback;
}

export interface DailyState {
  duration: DailyStepFeedback;
  unforeseenTickets: DailyStepFeedback;
  doneTickets: DailyStepFeedback;
  subjects: DailyStepFeedback;
  feelings: DailyStepFeedback;
}
