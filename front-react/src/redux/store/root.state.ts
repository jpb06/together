import User from "../../types/user.type";
import SnackbarFeedback from "../../types/snackbar.feedback.type";
import { TeamWithLastActivity } from "../../types/team.type";
import TimeLine from "../../types/timeline.type";

export interface RootState {
  readonly user: User | null;
  readonly userTeams: Array<TeamWithLastActivity>;
  readonly timeline: TimeLine | null;
  readonly error: any;
  readonly snackbarFeedback: SnackbarFeedback | null;
  readonly apiCallsInProgress: number;
}

const initialState: RootState = {
  user: null,
  userTeams: [],
  timeline: null,
  error: null,
  snackbarFeedback: null,
  apiCallsInProgress: 0
};

export { initialState };
