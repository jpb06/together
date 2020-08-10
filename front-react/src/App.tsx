import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";

import LoginContainer from "./components/anonymous/login/LoginContainer";
import NewAccountContainer from "./components/anonymous/new-user/NewAccountContainer";
import AppSnackbar from "./components/generic/feedback/AppSnackbar";
import DailyContainer from "./components/logged-in/daily/DailyContainer";
import LoggedInRootContainer from "./components/logged-in/LoggedInRootContainer";
import TimeLineContainer from "./components/logged-in/timeline/TimeLineContainer";
import UserAccountContainer from "./components/logged-in/user-account/UserAccountContainer";
import theme from "./create.theme";

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
      <AppSnackbar />
    </MuiThemeProvider>
  );
};

export default App;
