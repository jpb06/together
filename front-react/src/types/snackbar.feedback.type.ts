import { MessageType } from "../components/feedback/FeedbackSnackbarContent";

export default interface SnackbarFeedback {
  type: MessageType;
  message: string;
}
