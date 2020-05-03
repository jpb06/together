import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import userTeamsReducer from "./user/user.teams.reducer";
import snackbarFeedbackReducer from "./global/snackbar.feedback.reducer";
import apiStatusReducer from "./global/api.status.reducer";
import errorReducer from "./global/error.reducer";
import timelineReducer from "./user/timeline.reducer";
import dailyReducer from "./user/daily.reducer";
import teamMembersReducer from "./user/team.members.reducer";
import dailyDurationFeedbackReducer from "./daily-feedback/daily.duration.feedback.reducer";
import dailyUnforeseenFeedbackReducer from "./daily-feedback/daily.unforeseen.feedback.reducer";
import dailyDoneFeedbackReducer from "./daily-feedback/daily.done.feedback.reducer";
import dailySubjectsFeedbackReducer from "./daily-feedback/daily.subjects.reducer";
import dailyFeelingsFeedbackReducer from "./daily-feedback/daily.feelings.reducer";
import accountCreationStateReducer from "./account-creation/account.creation.state.reducer";

const rootReducer = combineReducers({
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

  error: errorReducer,
  snackbarFeedback: snackbarFeedbackReducer,
  apiCallsInProgress: apiStatusReducer,
});

export default rootReducer;
