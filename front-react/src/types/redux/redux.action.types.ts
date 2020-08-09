export enum ReduxActionType {
  // Application status
  ApplicationStatus = "APPLICATION-STATUS",
  // Snackbar
  Snackbar = "SNACKBAR",
  ClearSnackbar = "CLEAR-SNACKBAR",
  // Recent actions
  ClearLastAction = "CLEAR-LAST-ACTION",
  // Users
  Login = "LOGIN",
  CreateUser = "CREATE-USER",
  CreateUserDataSubmitted = "CREATE-USER-DATA-SUBMITTED",
  AvatarChosen = "AVATAR-CHOSEN",
  AnswerTeamInvite = "ANSWER-TEAM-INVITE",
  GetTimeline = "GET-TIMELINE",
  GetUserTeams = "GET-USER-TEAMS",
  // Teams
  CreateTeam = "CREATE-TEAM",
  TeamMembers = "TEAM-MEMBERS",
  InviteUserToTeam = "INVITE-USER-TO-TEAM",
  RequestToJoinTeam = "REQUEST-TO-JOIN-TEAM",
  // Daily
  GetDaily = "GET-DAILY",
  DailyDuration = "DAILY-DURATION",
  AddDoneTicket = "ADD-DONE-TICKET",
  AddUnforeseenTicket = "ADD-UNFORESEEN-TICKET",
  AddFeeling = "ADD-FEELING",
  AddSubject = "ADD-SUBJECT",
  RemoveDoneTicket = "REMOVE-DONE-TICKET",
  RemoveUnforeseenTicket = "REMOVE-UNFORESEEN-TICKET",
  RemoveFeeling = "REMOVE-FEELING",
  RemoveSubject = "REMOVE-SUBJECT",
  // Login
  LoginStateRetry = "LOGIN-STATE-RETRY",
  LoginStateReset = "LOGIN-STATE-RESET",
  LoginStatePending = "LOGIN-STATE-PENDING",
  LoginStateInvalidEmail = "LOGIN-STATE-INVALID-EMAIL",
  LoginStateFailed = "LOGIN-STATE-FAILED",
  // Answer team invite modal
  ShowAnswerTeamInviteModal = "SHOW-ANSWER-TEAM-INVITE-MODAL",
}

export enum ReduxActionModifiers {
  Saga = "SAGA",
  Success = "SUCCESS",
}
