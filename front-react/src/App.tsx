import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route } from "react-router-dom";
import theme from "./create.theme";
import LoginContainer from "./components/anonymous/login/LoginContainer";
import LoggedInRootContainer from "./components/logged-in/LoggedInRootContainer";
import FeedbackSnackbar from "./components/generic/feedback/FeedbackSnackbar";
import TimeLineContainer from "./components/logged-in/timeline/TimeLineContainer";
import UserAccountContainer from "./components/logged-in/user-account/UserAccountContainer";
import DailyContainer from "./components/logged-in/daily/DailyContainer";
import NewAccountContainer from "./components/anonymous/new-user/NewAccountContainer";

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Route exact path="/" component={LoginContainer} />
        <Route exact path="/newaccount" component={NewAccountContainer} />
        <Route
          path="/main"
          render={(props) => (
            <LoggedInRootContainer {...props} Component={TimeLineContainer} />
          )}
        />
        <Route
          path="/daily"
          render={(props) => (
            <LoggedInRootContainer {...props} Component={DailyContainer} />
          )}
        />
        <Route
          path="/account"
          render={(props) => (
            <LoggedInRootContainer
              {...props}
              Component={UserAccountContainer}
            />
          )}
        />
      </BrowserRouter>
      <FeedbackSnackbar />
    </MuiThemeProvider>
  );
};

export default App;
