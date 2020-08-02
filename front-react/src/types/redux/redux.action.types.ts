export enum ReduxActionType {
  // Application status
  ApplicationStatus = "APPLICATION-STATUS",
  // Snackbar
  Snackbar = "SNACKBAR",
  ClearSnackbar = "CLEAR-SNACKBAR",
  // Recent actions
  ClearRecentActions = "CLEAR-RECENT-ACTIONS",
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
}

export enum ReduxActionModifiers {
  Saga = "SAGA",
  Success = "SUCCESS",
}