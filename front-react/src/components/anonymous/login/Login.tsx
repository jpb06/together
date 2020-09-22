import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { LoginState } from "../../../types/redux";
import FeedbackButton from "../../generic/buttons/FeedbackButton";
import Logo, { LogoColor } from "../../generic/logo/Logo";
import styles from "./Login.styles";
import { LoginForm } from "./LoginContainer";

interface LoginProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  form: LoginForm;
  state: LoginState;
}

const Login: React.FC<LoginProps> = ({ onChange, onSubmit, form, state }) => {
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
            {state.isPending && <LinearProgress aria-label="linear-pending" />}
            <Logo
              color={LogoColor.Primary}
              isCentered
              isLargeFont
              hasDescriptionText
              isIndexLinkDisabled
            />
            <TextField
              value={form.email}
              onChange={onChange}
              error={state.isSubmitted && form.email === ""}
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
              value={form.password}
              onChange={onChange}
              error={state.isSubmitted && form.password === ""}
              required
              id="password"
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <FeedbackButton IconComponent={AddCircleIcon} {...state} />
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
