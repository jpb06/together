import React from "react";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Logo, { LogoColor } from "../../generic/logo/Logo";
import styles from "./NewAccount.styles";
import ColoredFatLinearProgress, {
  FatProgressColor,
} from "../../generic/loaders/ColoredFatLinearProgress";
import AccountCreationStepper from "./stepper/AccountCreationStepper";
import UserCreationStepContainer from "./steps/user-creation/UserCreationStepContainer";
import {
  AccountCreationState,
  AccountCreationStep,
} from "../../../redux/types/account.creation.state.type";
import User, { NewUser } from "../../../types/user.type";
import UserAvatarStepContainer from "./steps/user-avatar/UserAvatarStepContainer";
import UserTeamStepContainer from "./steps/user-team/UserTeamStepContainer";
import { TeamActionType } from "./NewAccountContainer";
import AddTeamMembersStepContainer from "./steps/add-team-members/AddTeamMembersStepContainer";

interface NewAccountProps {
  state: AccountCreationState;
  loggedUser: User | null;
  onUserCreation: (user: NewUser) => void;
  onAvatarChosen: () => void;
  onTeamAction: (name: string, actionType: TeamActionType) => void;
}

const NewAccount: React.FC<NewAccountProps> = ({
  state,
  loggedUser,
  onUserCreation,
  onAvatarChosen,
  onTeamAction,
}) => {
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
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.fixedWidth}
      >
        <Card className={classes.card}>
          <CardHeader
            title={
              <Logo
                isCentered
                isIndexLinkDisabled
                isLargeFont
                hasDescriptionText
                color={LogoColor.Primary}
              />
            }
          />
          <CardMedia
            className={classes.cardMedia}
            image="/static/images/Agile_2.jpg"
            title="Agile"
          />
          {state.isLoading && (
            <ColoredFatLinearProgress
              variant="query"
              color={FatProgressColor.Amber}
            />
          )}
          <CardContent className={classes.cardContent}>
            <AccountCreationStepper step={state.step} />
            <UserCreationStepContainer
              state={state}
              onUserCreation={onUserCreation}
            />
            {loggedUser && (
              <>
                <UserAvatarStepContainer
                  state={state}
                  user={loggedUser}
                  onAvatarChosen={onAvatarChosen}
                />{" "}
                <UserTeamStepContainer
                  state={state}
                  onTeamAction={onTeamAction}
                />
                {state.step === AccountCreationStep.InviteUsersToTeam && (
                  <AddTeamMembersStepContainer
                    state={state}
                    user={loggedUser}
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default NewAccount;
