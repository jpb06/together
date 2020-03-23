import { MessageType } from "../components/errors/FeedbackSnackbarContent";
import React from "react";

export interface SnackbarInfo {
  key: string;
  type: MessageType;
  message: string;
}

const useFeedbackSnackbar = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  SnackbarInfo,
  (type: MessageType, message: string) => void,
  () => void
] => {
  const feedbackQueue = React.useRef<any>([]);
  const [feedbackSnackbarInfo, setFeedbackSnackbarInfo] = React.useState<
    SnackbarInfo
  >({
    key: "",
    type: MessageType.Error,
    message: ""
  });
  const [isFeedbackSnackbarOpen, setIsFeedbackSnackbarOpen] = React.useState(
    false
  );

  // unstacking one message to display and displaying the taskbar
  const processFeedbackQueue = () => {
    if (feedbackQueue.current.length > 0) {
      setFeedbackSnackbarInfo(feedbackQueue.current.shift());
      setIsFeedbackSnackbarOpen(true);
    }
  };

  // Dispatch from a child stating there is a message to display
  const messageRequestedFromChild = (type: MessageType, message: string) => {
    feedbackQueue.current.push({
      type,
      message,
      key: new Date().getTime()
    });

    if (isFeedbackSnackbarOpen) {
      // immediately begin dismissing current message
      // to start showing new one
      setIsFeedbackSnackbarOpen(false);
    } else {
      processFeedbackQueue();
    }
  };

  return [
    isFeedbackSnackbarOpen,
    setIsFeedbackSnackbarOpen,
    feedbackSnackbarInfo,
    messageRequestedFromChild,
    processFeedbackQueue
  ];
};

export default useFeedbackSnackbar;
