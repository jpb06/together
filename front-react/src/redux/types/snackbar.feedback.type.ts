import { MessageType } from "../../components/generic/feedback/FeedbackSnackbarContent";

export default interface SnackbarFeedback {
  type: MessageType;
  message: string;
}
