import { Daily, TimeLine, User } from "../../../../shared/types";
import { TeamMember, TeamWithLastActivity } from "../../../../shared/types";
import { initializeUserFromLocalStorage } from "../../logic/user.util";
import {
    AccountCreationState, AccountCreationStep, ApplicationStatus, DailyStepFeedback, SnackbarData,
    SnackbarType
} from "../../types/redux";
import { RecentAction } from "../../types/redux/recent.action.interface";
import { initDailyStep } from "../reducers/daily-feedback/daily.feedback.logic";

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
  readonly status: ApplicationStatus;
  readonly snackbar: SnackbarData;
  readonly recentActions: Array<RecentAction>;
}

const initialState: RootState = {
  // user
  user: initializeUserFromLocalStorage(),
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
    exitActionText: "No thanks, bring me to my timeline!",
    newTeamMembers: [],
  },
  // global
  status: ApplicationStatus.Available,
  snackbar: {
    isOpen: false,
    type: SnackbarType.Error,
    text: "",
  },
  recentActions: [],
};

export { initialState, initDailyStep };
