import { combineReducers } from "redux";

import recentActionsReducer from "./global/recent.actions.reducer";
import snackbarReducer from "./global/snackbar.reducer";
import dailyReducer from "./user/daily.reducer";
import teamMembersReducer from "./user/team.members.reducer";
import timelineReducer from "./user/timeline.reducer";
import userReducer from "./user/user.reducer";
import userTeamsReducer from "./user/user.teams.reducer";
import accountCreationStateReducer from "./workflows/account.creation.state.reducer";
import answerTeamInviteModalStateReducer from "./workflows/answer.team.invite.modal.state.reducer";
import dailyStatusReducer from "./workflows/daily.state.reducer";
import loginStateReducer from "./workflows/login.state.reducer";

const rootReducer = combineReducers({
  snackbar: snackbarReducer,
  lastAction: recentActionsReducer,

  user: userReducer,
  userTeams: userTeamsReducer,
  teamMembers: teamMembersReducer,
  timeline: timelineReducer,

  daily: dailyReducer,

  accountCreationState: accountCreationStateReducer,
  loginState: loginStateReducer,
  answerTeamInviteModalState: answerTeamInviteModalStateReducer,
  dailyState: dailyStatusReducer,
});

export default rootReducer;
