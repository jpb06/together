import User, { TeamMember } from "../../types/user.type";
import SnackbarFeedback from "../../types/snackbar.feedback.type";
import { TeamWithLastActivity } from "../../types/team.type";
import TimeLine from "../../types/timeline.type";
import { MessageType } from "../../components/feedback/FeedbackSnackbarContent";
import * as localStorage from "local-storage";
import LocalStorageKeys from "../../logic/local.storage.keys";
import { addComputedPropertiesToUser } from "../../logic/user.util";
import Daily from "../../types/daily.type";
import { initDailyStep } from "../logic/daily.feedback.logic";

export interface DailyGlobalFeedback {
  isValidated: boolean;
  isPending: boolean;
}

export interface DailyAddActionFeedback {
  isPending: boolean;
  isErrored: boolean;
  text: string;
}

export interface DailyDeleteActionFeedback {
  isPending: boolean;
  term: string;
}

export interface DailyStepFeedback {
  globalFeedback: DailyGlobalFeedback;
  addActionFeedback?: DailyAddActionFeedback;
  deleteActionFeedback?: DailyDeleteActionFeedback;
}

export interface RootState {
  readonly user: User | null;
  readonly userTeams: Array<TeamWithLastActivity>;
  readonly timeline: TimeLine | null;
  readonly daily: Daily | null;

  readonly dailyDurationFeedback: DailyStepFeedback;
  readonly dailyUnforeseenTicketsFeedback: DailyStepFeedback;
  readonly dailyDoneTicketsFeedback: DailyStepFeedback;
  readonly dailySubjectsFeedback: DailyStepFeedback;
  readonly dailyFeelingsFeedback: DailyStepFeedback;

  readonly teamMembers: Array<TeamMember>;
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
  daily: null,
  teamMembers: [],
  error: null,
  snackbarFeedback: { type: MessageType.Success, message: "" },
  dailyDurationFeedback: {
    globalFeedback: { isValidated: false, isPending: false },
  },
  dailyUnforeseenTicketsFeedback: initDailyStep(),
  dailyDoneTicketsFeedback: initDailyStep(),
  dailySubjectsFeedback: initDailyStep(),
  dailyFeelingsFeedback: initDailyStep(),
  apiCallsInProgress: 0,
};

export { initialState, initDailyStep };
