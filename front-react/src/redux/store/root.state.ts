import User from "../../types/user.type";
import SnackbarFeedback from "../../types/snackbar.feedback.type";
import { TeamWithLastActivity } from "../../types/team.type";
import TimeLine from "../../types/timeline.type";
import { MessageType } from "../../components/feedback/FeedbackSnackbarContent";
import * as localStorage from "local-storage";
import LocalStorageKeys from "../../logic/local.storage.keys";
import { addComputedPropertiesToUser } from "../../logic/user.util";

export interface RootState {
  readonly user: User | null;
  readonly userTeams: Array<TeamWithLastActivity>;
  readonly timeline: TimeLine | null;
  readonly error: any;
  readonly snackbarFeedback: SnackbarFeedback;
  readonly apiCallsInProgress: number;
}

const initUser = () => {
  const user = localStorage.get<User | null>(LocalStorageKeys.user);

  return user ? addComputedPropertiesToUser(user) : null;
};

const initialState: RootState = {
  user: initUser(),
  userTeams: [],
  timeline: null,
  error: null,
  snackbarFeedback: { type: MessageType.Success, message: "" },
  apiCallsInProgress: 0
};

export { initialState };
