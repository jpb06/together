import React from "react";
import styles from "./UserAvatarStepForm.styles";
import StepTitle from "../StepTitle";
import { Grid, Typography, Avatar, useTheme } from "@material-ui/core";
import FeedbackButton from "../../../../generic/buttons/FeedbackButton";
import User from "../../../../../types/user.type";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import { stringToColor } from "../../../../../logic/colors.util";
import { AccountCreationState } from "../../../../../redux/types/account.creation.state.type";

interface UserAvatarStepFormProps {
  state: AccountCreationState;
  user: User;
  onAvatarChosen: () => void;
}

const UserAvatarStepForm: React.FC<UserAvatarStepFormProps> = ({
  state,
  user,
  onAvatarChosen,
}) => {
  const classes = styles();
  const theme = useTheme();

  const [avatarColor] = React.useState(stringToColor(user.fullName));
  const [avatarTextColor] = React.useState(
    theme.palette.getContrastText(stringToColor(user.fullName))
  );

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={1}
    >
      <StepTitle title="Avatar selection" />
      <Grid item xs={12} sm={12} className={classes.centered}>
        <Typography color="primary">
          We have generated a default avatar for you
          <br />
          You will soon be able to customize it or use a picture instead!
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} className={classes.centered}>
        <Avatar
          className={classes.avatar}
          style={{ backgroundColor: avatarColor, color: avatarTextColor }}
        >
          {user.initials}
        </Avatar>
      </Grid>
      <Grid item xs={12} sm={12} className={classes.centered}>
        <Typography className={classes.fullName}>{user.fullName}</Typography>
      </Grid>
      <FeedbackButton
        actionText={state.actionButtonText}
        IconComponent={GroupWorkIcon}
        isErrored={state.isErrored}
        isPending={state.isLoading}
        onSubmit={onAvatarChosen}
      />
    </Grid>
  );
};

export default UserAvatarStepForm;