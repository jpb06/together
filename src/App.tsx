import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route } from "react-router-dom";
import theme from "./create.theme";

import LoginContainer from "./components/login/LoginContainer";
import LoggedInRootContainer from "./components/logged-in/LoggedInRootContainer";
import FeedbackSnackbar from "./components/errors/FeedbackSnackbar";
import useFeedbackSnackbar from "./hooks/useFeedbackSnackbar";
import TimeLineContainer from "./components/logged-in/timeline/TimeLineContainer";

const App = () => {
  const [
    isFeedbackSnackbarOpen,
    setIsFeedbackSnackbarOpen,
    feedbackSnackbarInfo,
    messageRequestedFromChild,
    processFeedbackQueue
  ] = useFeedbackSnackbar();

  const handleCloseSnackbar = () => setIsFeedbackSnackbarOpen(false);
  const handleExitSnackbar = () => processFeedbackQueue();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Route exact path="/" component={LoginContainer} />
        <Route
          path="/main"
          render={props => (
            <LoggedInRootContainer
              {...props}
              onSnackbackRequested={messageRequestedFromChild}
              Component={TimeLineContainer}
            />
          )}
        />
      </BrowserRouter>
      <FeedbackSnackbar
        onClose={handleCloseSnackbar}
        onExited={handleExitSnackbar}
        isOpen={isFeedbackSnackbarOpen}
        {...feedbackSnackbarInfo}
      />
    </MuiThemeProvider>
  );
};

export default App;
