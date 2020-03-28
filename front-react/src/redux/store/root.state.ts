import User from "../../types/user.type";
import SnackbarFeedback from "../../types/snackbar.feedback.type";
import { TeamWithLastActivity } from "../../types/team.type";
import TimeLine from "../../types/timeline.type";
import { MessageType } from "../../components/feedback/FeedbackSnackbarContent";

export interface RootState {
  readonly user: User | null;
  readonly userTeams: Array<TeamWithLastActivity>;
  readonly timeline: TimeLine | null;
  readonly error: any;
  readonly snackbarFeedback: SnackbarFeedback;
  readonly apiCallsInProgress: number;
}

const initialState: RootState = {
  user: null,
  userTeams: [],
  timeline: null,
  error: null,
  snackbarFeedback: { type: MessageType.Success, message: "" },
  apiCallsInProgress: 0
};

export { initialState };
