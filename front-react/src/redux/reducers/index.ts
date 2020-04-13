import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { userTeamsReducer } from "./user.teams.reducer";
import { snackbarFeedbackReducer } from "./global/snackbar.feedback.reducer";
import { apiStatusReducer } from "./global/api.status.reducer";
import { errorReducer } from "./global/error.reducer";
import { timelineReducer } from "./timeline.reducer";
import { dailyReducer } from "./daily.reducer";
import { teamMembersReducer } from "./team.members.reducer";
import { dailyDurationFeedbackReducer } from "./daily-feedback/daily.duration.feedback.reducer";
import { dailyUnforeseenFeedbackReducer } from "./daily-feedback/daily.unforeseen.feedback.reducer";
import { dailyDoneFeedbackReducer } from "./daily-feedback/daily.done.feedback.reducer";
import { dailySubjectsFeedbackReducer } from "./daily-feedback/daily.subjects.reducer";
import { dailyFeelingsFeedbackReducer } from "./daily-feedback/daily.feelings.reducer";

const rootReducer = combineReducers({
  apiCallsInProgress: apiStatusReducer,

  user: userReducer,
  userTeams: userTeamsReducer,
  teamMembers: teamMembersReducer,
  timeline: timelineReducer,
  daily: dailyReducer,

  error: errorReducer,

  snackbarFeedback: snackbarFeedbackReducer,
  dailyDurationFeedback: dailyDurationFeedbackReducer,
  dailyUnforeseenTicketsFeedback: dailyUnforeseenFeedbackReducer,
  dailyDoneTicketsFeedback: dailyDoneFeedbackReducer,
  dailySubjectsFeedback: dailySubjectsFeedbackReducer,
  dailyFeelingsFeedback: dailyFeelingsFeedbackReducer,
});

export default rootReducer;
