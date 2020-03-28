import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { userTeamsReducer } from "./user.teams.reducer";
import { snackbarFeedbackReducer } from "./snackbar.feedback.reducer";
import { apiStatusReducer } from "./api.status.reducer";
import { errorReducer } from "./error.reducer";
import { timelineReducer } from "./timeline.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  userTeams: userTeamsReducer,
  timeline: timelineReducer,
  error: errorReducer,
  snackbarFeedback: snackbarFeedbackReducer,
  apiCallsInProgress: apiStatusReducer
});

export default rootReducer;
