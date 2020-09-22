import React from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FaceIcon from "@material-ui/icons/Face";

import { isPasswordValid, validateEmail } from "../../../../../logic/user.util";
import { NewUser } from "../../../../../stack-shared-code/types";
import { AccountCreationState } from "../../../../../types/redux";
import FeedbackButton from "../../../../generic/buttons/FeedbackButton";
import PasswordStrength from "../../../../generic/password/PasswordStrength";
import NewAccountBusyIndicator from "../../busy-indicator/NewAccountBusyIndicator";
import StepTitle from "../StepTitle";
import styles from "./UserCreationStepForm.styles";

interface UserCreationStepFormProps {
  state: AccountCreationState;
  user: NewUser;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const UserCreationStepForm: React.FC<UserCreationStepFormProps> = ({
  state,
  user,
  onChange,
  onSubmit,
}) => {
  const classes = styles();

  if (state.isLoading)
    return (
      <NewAccountBusyIndicator
        text="Creating your account"
        IconComponent={AddCircleOutlineIcon}
      />
    );

  return (
    <form onSubmit={onSubmit}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={1}
      >
        <StepTitle title="Welcome !" />
        <Grid item sm={12} xs={12}>
          <Typography color="primary">
            Please tell us a little bit about yourself
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            //  required
            id="firstName"
            label="First name"
            type="text"
            name="firstName"
            margin="dense"
            variant="outlined"
            fullWidth
            value={user.firstName}
            error={state.isSubmitted && user.firstName === ""}
            onChange={onChange}
            className={classes.noMargin}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            //required
            id="lastName"
            label="Last name"
            name="lastName"
            type="text"
            margin="dense"
            variant="outlined"
            fullWidth
            value={user.lastName}
            error={state.isSubmitted && user.lastName === ""}
            onChange={onChange}
            className={classes.noMargin}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <TextField
            //   required
            id="email"
            label="Email address"
            name="email"
            type="email"
            margin="dense"
            variant="outlined"
            fullWidth
            value={user.email}
            error={state.isSubmitted && !validateEmail(user.email)}
            onChange={onChange}
            className={classes.noMargin}
            autoComplete="username"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography color="primary">
            Time to choose a cool password !
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            //    required
            id="password"
            label="password"
            name="password"
            type="password"
            margin="dense"
            variant="outlined"
            fullWidth
            value={user.password}
            error={
              !isPasswordValid(
                state.isSubmitted,
                user.password,
                user.confirmPassword
              )
            }
            onChange={onChange}
            className={classes.noMargin}
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            //    required
            id="confirmPassword"
            label="Confirm password"
            name="confirmPassword"
            type="password"
            margin="dense"
            variant="outlined"
            fullWidth
            value={user.confirmPassword}
            error={
              !isPasswordValid(
                state.isSubmitted,
                user.password,
                user.confirmPassword
              )
            }
            onChange={onChange}
            className={classes.noMargin}
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          {user.password === user.confirmPassword && (
            <PasswordStrength password={user.password} />
          )}
          {user.password !== user.confirmPassword && (
            <div className={classes.errorText}>Passwords differ</div>
          )}
        </Grid>
        <FeedbackButton
          IconComponent={FaceIcon}
          isPending={state.isLoading}
          isErrored={state.isErrored}
          actionText={state.actionButtonText}
        />
      </Grid>
    </form>
  );
};

export default UserCreationStepForm;
