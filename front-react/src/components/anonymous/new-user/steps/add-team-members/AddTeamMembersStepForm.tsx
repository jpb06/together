import React from "react";

import { TextField, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { AccountCreationState } from "../../../../../types/redux";
import { TeamMember as TeamMemberType } from "../../../../../types/shared";
import FeedbackButton from "../../../../generic/buttons/FeedbackButton";
import SimpleButton from "../../../../generic/buttons/SimpleButton";
import ColoredCard from "../../../../generic/containers/ColoredCard";
import TeamMember from "../../../../logged-in/user-account/team-list/team-member/TeamMember";
import StepTitle from "../StepTitle";
import styles from "./AddTeamMembersStepForm.styles";

interface AddTeamMembersStepFormProps {
  state: AccountCreationState;
  email: string;
  teamMembers: Array<TeamMemberType>;
  exitActionText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTeamInviteSent: () => void;
  onGoToTimeline: () => void;
}

const AddTeamMembersStepForm: React.FC<AddTeamMembersStepFormProps> = ({
  state,
  email,
  teamMembers,
  exitActionText,
  onChange,
  onTeamInviteSent,
  onGoToTimeline,
}) => {
  const classes = styles();

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={1}
    >
      <StepTitle
        title="Add members to your team"
        description="Almost done! Would you like to add right away people to your team?"
      />
      <Grid item xs={12} sm={12}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12} md={12}>
            <SimpleButton text={exitActionText} onClick={onGoToTimeline} />
          </Grid>
          <Grid>
            <AccountCircleIcon color="primary" className={classes.titleIcon} />
          </Grid>
          <Grid item xs={12} md={12} className={classes.container}>
            <Slide direction="up" timeout={500} in mountOnEnter unmountOnExit>
              <ColoredCard
                color={grey[900]}
                children={
                  <>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="flex-start"
                    >
                      {teamMembers.map((user) => (
                        <TeamMember key={user.id} user={user} />
                      ))}
                    </Grid>
                    <Divider className={classes.divider} />
                    <Typography>
                      We will send a join request to the user this email belongs
                      to
                    </Typography>
                    <TextField
                      required
                      id="email"
                      label="User email"
                      name="email"
                      type="email"
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      value={email}
                      error={state.isSubmitted && email === ""}
                      onChange={onChange}
                    />
                    <FeedbackButton
                      IconComponent={AddCircleIcon}
                      actionText="Send invite"
                      name="add-user"
                      isErrored={state.isErrored}
                      isPending={state.isLoading}
                      onSubmit={onTeamInviteSent}
                    />
                  </>
                }
              />
            </Slide>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddTeamMembersStepForm;
