import { combineReducers } from "redux";

import dailyDoneFeedbackReducer from "./daily-feedback/daily.done.feedback.reducer";
import dailyDurationFeedbackReducer from "./daily-feedback/daily.duration.feedback.reducer";
import dailyFeelingsFeedbackReducer from "./daily-feedback/daily.feelings.reducer";
import dailySubjectsFeedbackReducer from "./daily-feedback/daily.subjects.reducer";
import dailyUnforeseenFeedbackReducer from "./daily-feedback/daily.unforeseen.feedback.reducer";
import recentActionsReducer from "./global/recent.actions.reducer";
import snackbarReducer from "./global/snackbar.reducer";
import dailyReducer from "./user/daily.reducer";
import teamMembersReducer from "./user/team.members.reducer";
import timelineReducer from "./user/timeline.reducer";
import userReducer from "./user/user.reducer";
import userTeamsReducer from "./user/user.teams.reducer";
import accountCreationStateReducer from "./workflows/account.creation.state.reducer";
import answerTeamInviteModalStateReducer from "./workflows/answer.team.invite.modal.state.reducer";
import loginStateReducer from "./workflows/login.state.reducer";

const rootReducer = combineReducers({
  snackbar: snackbarReducer,
  recentActions: recentActionsReducer,

  user: userReducer,
  userTeams: userTeamsReducer,
  teamMembers: teamMembersReducer,
  timeline: timelineReducer,

  daily: dailyReducer,
  dailyDurationFeedback: dailyDurationFeedbackReducer,
  dailyUnforeseenTicketsFeedback: dailyUnforeseenFeedbackReducer,
  dailyDoneTicketsFeedback: dailyDoneFeedbackReducer,
  dailySubjectsFeedback: dailySubjectsFeedbackReducer,
  dailyFeelingsFeedback: dailyFeelingsFeedbackReducer,

  accountCreationState: accountCreationStateReducer,
  loginState: loginStateReducer,
  answerTeamInviteModalState: answerTeamInviteModalStateReducer,
});

export default rootReducer;
