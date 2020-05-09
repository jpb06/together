export enum Context {
  Global = "_GLOBAL",
  Modal = "_MODAL",
  AccountCreation = "_ACCOUNT-CREATION",
  Daily = "_DAILY",
}

export enum Result {
  Success = "_SUCCESS",
  Failure = "_FAILURE",
}

export enum Type {
  // api call
  beginApiCall = "BEGIN_API_CALL",
  // User
  login = "LOGIN",
  getUserTeams = "GET-USER-TEAMS",
  acceptTeamInvite = "ACCEPT-TEAM-INVITE",
  declineTeamInvite = "DECLINE-TEAM-INVITE",
  getTimeline = "GET-TIMELINE",
  // Team
  getTeamMembers = "GET-TEAM-MEMBERS",
  // Daily
  getDaily = "GET-DAILY",
  daily = "DAILY",
  // Account creation
  createTeam = "CREATE-TEAM",
  inviteUser = "INVITE-USER",
  requestToJoinTeam = "REQUEST-TO-JOIN-TEAM",
  createUser = "CREATE-USER",
}

/* **************************************************************************************************
   Errors
   ************************************************************************************************** */

export const CLEAR_ERROR = "CLEAR_ERROR";
export const SET_ERROR = "SET_ERROR";

/* **************************************************************************************************
   Feedback (Snackbar)
   ************************************************************************************************** */

export const SHOW_ERROR_FEEDBACK = "SHOW_ERROR_FEEDBACK";
export const SHOW_INFO_FEEDBACK = "SHOW_INFO_FEEDBACK";
export const SHOW_SUCCESS_FEEDBACK = "SHOW_SUCCESS_FEEDBACK";
export const SHOW_WARNING_FEEDBACK = "SHOW_WARNING_FEEDBACK";
export const CLEAR_FEEDBACK = "CLEAR_FEEDBACK";

/* **************************************************************************************************
   User
   ************************************************************************************************** */

export const UPDATE_USER = "UPDATE_USER";

/* **************************************************************************************************
   Account creation
   ************************************************************************************************** */

export const CREATE_USER_DATA_SUBMITTED = "CREATE_USER_DATA_SUBMITTED";
export const AVATAR_CHOSEN = "AVATAR_CHOSEN";
