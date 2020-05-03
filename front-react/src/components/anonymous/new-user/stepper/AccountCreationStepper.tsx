import React from "react";
import Stepper from "@material-ui/core/Stepper";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import FaceIcon from "@material-ui/icons/Face";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import styles from "./AccountCreationStepper.styles";
import { AccountCreationStep as StepEnum } from "../../../../redux/types/account.creation.state.type";
import { Step, StepLabel } from "@material-ui/core";
import clsx from "clsx";

interface AccountCreationStepperProps {
  step: StepEnum;
}

const AccountCreationStepper: React.FC<AccountCreationStepperProps> = ({
  step,
}) => {
  const classes = styles();

  return (
    <Stepper
      alternativeLabel
      orientation="horizontal"
      activeStep={step}
      className={classes.stepper}
    >
      <Step completed={step > StepEnum.User} active={step === StepEnum.User}>
        <StepLabel
          icon={<PersonAddIcon />}
          className={clsx({
            [classes.stepCompleted]: step >= StepEnum.User,
          })}
          classes={{
            alternativeLabel: clsx(classes.alternativeLabel, {
              [classes.stepCompleted]: step >= StepEnum.User,
            }),
          }}
        >
          Infos
        </StepLabel>
      </Step>
      <Step
        completed={step > StepEnum.Avatar}
        active={step === StepEnum.Avatar}
      >
        <StepLabel
          icon={<FaceIcon />}
          className={clsx({
            [classes.stepCompleted]: step >= StepEnum.Avatar,
          })}
          classes={{
            alternativeLabel: clsx(classes.alternativeLabel, {
              [classes.stepCompleted]: step >= StepEnum.Avatar,
            }),
          }}
        >
          Avatar
        </StepLabel>
      </Step>
      <Step
        completed={step > StepEnum.TeamChoice}
        active={step === StepEnum.TeamChoice}
      >
        <StepLabel
          icon={<GroupWorkIcon />}
          className={clsx({
            [classes.stepCompleted]: step >= StepEnum.TeamChoice,
          })}
          classes={{
            alternativeLabel: clsx(classes.alternativeLabel, {
              [classes.stepCompleted]: step >= StepEnum.TeamChoice,
            }),
          }}
        >
          Avatar
        </StepLabel>
      </Step>
    </Stepper>
  );
};

export default AccountCreationStepper;
