import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Link from "@material-ui/core/Link";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import styles from "./Login.styles";
import { Link as RouterLink } from "react-router-dom";

import Logo from "../generic/Logo";
import FeedbackButton from "../generic/buttons/FeedbackButton";
import { LoginState } from "./LoginContainer";

interface LoginProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  state: LoginState;
}

const Login: React.FC<LoginProps> = ({ onChange, onSubmit, state }) => {
  const classes = styles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <form onSubmit={onSubmit} className={classes.form}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="/static/images/Agile_2.jpg"
            title="Agile"
          />
          <CardContent>
            {state.isPending && <LinearProgress />}
            <Logo
              color="primary"
              isCentered
              isLargeFont
              hasDescriptionText
              isIndexLinkDisabled
            />
            <TextField
              value={state.email}
              onChange={onChange}
              error={state.isSubmitted && state.email === ""}
              required
              id="email"
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <br />
            <TextField
              value={state.password}
              onChange={onChange}
              error={state.isSubmitted && state.password === ""}
              required
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <FeedbackButton
              IconComponent={AddCircleIcon}
              handleSubmit={undefined}
              {...state}
            />
          </CardActions>
          <div className={classes.newAccount}>
            <Link component={RouterLink} to="/newaccount" color="primary">
              <Typography>I don't have an account</Typography>
            </Link>
          </div>
        </Card>
      </form>
    </Grid>
  );
};

export default Login;
