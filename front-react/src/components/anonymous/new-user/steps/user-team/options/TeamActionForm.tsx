import React, { useState } from "react";

import { SvgIconTypeMap } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

import { AccountCreationState } from "../../../../../../types/redux";
import FeedbackButton from "../../../../../generic/buttons/FeedbackButton";
import SimpleButton from "../../../../../generic/buttons/SimpleButton";
import ColoredCard from "../../../../../generic/containers/ColoredCard";
import NewAccountBusyIndicator from "../../../busy-indicator/NewAccountBusyIndicator";
import { TeamActionType } from "../../../NewAccountContainer";
import styles from "./TeamActionForm.styles";

interface CreateTeamFormProps {
  state: AccountCreationState;
  type: TeamActionType;
  descriptionText: string;
  cancelActionText: string;
  transitionDirection: "left" | "right";
  ActionIcon: OverridableComponent<SvgIconTypeMap>;
  TitleIcon: OverridableComponent<SvgIconTypeMap>;
  onTeamAction: (name: string, actionType: TeamActionType) => void;
  onCancelAction: () => void;
}

const CreateTeamForm: React.FC<CreateTeamFormProps> = ({
  state,
  type,
  descriptionText,
  cancelActionText,
  transitionDirection,
  ActionIcon,
  TitleIcon,
  onTeamAction,
  onCancelAction,
}) => {
  const classes = styles();

  const [teamName, setTeamName] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTeamName(event.target.value);

  const handleSubmit = () => onTeamAction(teamName, type);

  const loadingText = (() => {
    switch (type) {
      case TeamActionType.Create:
        return `Creating team ${teamName}`;
      case TeamActionType.Join:
        return `Sending membership request for team ${teamName}`;
    }
  })();

  const buttonText = (() => {
    switch (type) {
      case TeamActionType.Create:
        return "Create";
      case TeamActionType.Join:
        return "Request to join";
    }
  })();

  if (state.isLoading)
    return (
      <NewAccountBusyIndicator text={loadingText} IconComponent={ActionIcon} />
    );

  return (
    <Grid item xs={12} sm={12} className={classes.centered}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <SimpleButton text={cancelActionText} onClick={onCancelAction} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Slide
            direction={transitionDirection}
            timeout={500}
            in
            mountOnEnter
            unmountOnExit
          >
            <TitleIcon className={classes.actionIcon} color="primary" />
          </Slide>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Slide direction="up" timeout={500} in mountOnEnter unmountOnExit>
            <ColoredCard
              backgroundColor={grey[900]}
              children={
                <div>
                  {descriptionText}
                  <TextField
                    required
                    id="teamName"
                    label="Team name"
                    name="teamName"
                    type="text"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    value={teamName}
                    error={state.isSubmitted && teamName === ""}
                    onChange={handleChange}
                  />
                  <FeedbackButton
                    IconComponent={ActionIcon}
                    actionText={buttonText}
                    isErrored={state.isErrored}
                    isPending={state.isLoading}
                    onSubmit={handleSubmit}
                  />
                </div>
              }
            />
          </Slide>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateTeamForm;
