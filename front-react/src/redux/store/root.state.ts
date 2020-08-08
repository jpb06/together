import { initializeUserFromLocalStorage } from "../../logic/user.util";
import {
    AccountCreationState, AccountCreationStep, DailyStepFeedback, SnackbarData, SnackbarType
} from "../../types/redux";
import { RecentAction } from "../../types/redux/recent.action.interface";
import {
    AnswerTeamInviteModalState, AnswerTeamInviteModalSteps
} from "../../types/redux/workflows/answer.team.invite.modal.state.interface";
import { LoginState } from "../../types/redux/workflows/login.state.interface";
import { Daily, TimeLine, User } from "../../types/shared";
import { TeamMember, TeamWithLastActivity } from "../../types/shared";
import { initDailyStep } from "../reducers/daily-feedback/daily.feedback.logic";

export interface RootState {
  // Global
  readonly snackbar: SnackbarData;
  readonly recentActions: Array<RecentAction>;

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

  // workflows
  readonly loginState: LoginState;
  readonly accountCreationState: AccountCreationState;
  readonly answerTeamInviteModalState: AnswerTeamInviteModalState;
}

const initialState: RootState = {
  // global
  snackbar: {
    isOpen: false,
    type: SnackbarType.Error,
    text: "",
  },
  recentActions: [],
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
  // login
  loginState: {
    isPending: false,
    isErrored: false,
    isSubmitted: false,
    actionText: "Login",
  },
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
  // Answer team invite modal
  answerTeamInviteModalState: {
    step: AnswerTeamInviteModalSteps.Question,
    isModalOpen: false,
  },
};

export { initialState, initDailyStep };
