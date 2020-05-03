import User, { TeamMember } from "../../types/user.type";
import SnackbarFeedback from "../types/snackbar.feedback.type";
import { TeamWithLastActivity } from "../../types/team.type";
import TimeLine from "../../types/timeline.type";
import { MessageType } from "../../components/generic/feedback/FeedbackSnackbarContent";
import Daily from "../../types/daily.type";
import { initDailyStep } from "../logic/daily.feedback.logic";
import { DailyStepFeedback } from "../types/daily.feedback.type";
import initUser from "../logic/user.logic";
import {
  AccountCreationState,
  AccountCreationStep,
} from "../types/account.creation.state.type";

export interface RootState {
  // User
  readonly user: User | null;
  readonly userTeams: Array<TeamWithLastActivity>;
  readonly timeline: TimeLine | null;
  readonly teamMembers: Array<TeamMember>;

  // Daily related
  readonly daily: Daily | null;
  readonly dailyDurationFeedback: DailyStepFeedback;
  readonly dailyUnforeseenTicketsFeedback: DailyStepFeedback;
  readonly dailyDoneTicketsFeedback: DailyStepFeedback;
  readonly dailySubjectsFeedback: DailyStepFeedback;
  readonly dailyFeelingsFeedback: DailyStepFeedback;

  // Account creation
  readonly accountCreationState: AccountCreationState;

  // Global
  readonly error: any;
  readonly snackbarFeedback: SnackbarFeedback;
  readonly apiCallsInProgress: number;
}

const initialState: RootState = {
  // user
  user: initUser(),
  userTeams: [],
  timeline: null,
  teamMembers: [],
  // daily
  daily: null,
  dailyDurationFeedback: {
    globalFeedback: { isValidated: false, isPending: false },
  },
  dailyUnforeseenTicketsFeedback: initDailyStep(),
  dailyDoneTicketsFeedback: initDailyStep(),
  dailySubjectsFeedback: initDailyStep(),
  dailyFeelingsFeedback: initDailyStep(),
  // account creation
  accountCreationState: {
    step: AccountCreationStep.User,
    isLoading: false,
    isErrored: false,
    isSubmitted: false,
    actionButtonText: "Choose my avatar",
  },
  // global
  error: null,
  snackbarFeedback: { type: MessageType.Success, message: "" },
  apiCallsInProgress: 0,
};

export { initialState, initDailyStep };
