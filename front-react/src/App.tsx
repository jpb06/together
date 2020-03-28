import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route } from "react-router-dom";
import theme from "./create.theme";
import LoginContainer from "./components/login/LoginContainer";
import LoggedInRootContainer from "./components/logged-in/LoggedInRootContainer";
import FeedbackSnackbar from "./components/feedback/FeedbackSnackbar";
import TimeLineContainer from "./components/logged-in/timeline/TimeLineContainer";

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Route exact path="/" component={LoginContainer} />
        <Route
          path="/main"
          render={props => (
            <LoggedInRootContainer {...props} Component={TimeLineContainer} />
          )}
        />
      </BrowserRouter>
      <FeedbackSnackbar />
    </MuiThemeProvider>
  );
};

export default App;
