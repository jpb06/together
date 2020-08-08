export enum ReduxActionContext {
  Global = "GLOBAL",
  Modal = "MODAL",
  Onboarding = "ONBOARDING",
  // Daily
  AddingDoneTicket = "DAILY-ADD-DONE-TICKET",
  RemovingDoneTicket = "DAILY-DEL-DONE-TICKET",
  AddingUnforeseenTicket = "DAILY-ADD-UNFORESEEN-TICKET",
  RemovingUnforeseenTicket = "DAILY-DEL-UNFORESEEN-TICKET",
  AddingSubject = "DAILY-ADD-SUBJECT",
  RemovingSubject = "DAILY-DEL-SUBJECT",
  AddingFeeling = "DAILY-ADD-FEELING",
  RemovingFeeling = "DAILY-DEL-FEELING",
  SetDuration = "DAILY-SET-DURATION",
}
