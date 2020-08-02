export enum DailyFeedbackType {
  Unknown,
  Duration,
  AddUnforeseenTicket,
  RemoveUnforeseenTicket,
  AddDoneTicket,
  RemoveDoneTicket,
  AddSubject,
  RemoveSubject,
  AddFeeling,
  RemoveFeeling,
}

export interface DailyAlterationBeginPayload {
  type: DailyFeedbackType;
  term: string;
}

export interface DailyAlterationPayload {
  type: DailyFeedbackType;
  data: any;
}
