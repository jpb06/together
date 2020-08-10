import clsx from "clsx";
import React from "react";

import { Step, StepLabel } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import FaceIcon from "@material-ui/icons/Face";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import { AccountCreationStep as StepEnum } from "../../../../types/redux";
import styles from "./AccountCreationStepper.styles";

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
