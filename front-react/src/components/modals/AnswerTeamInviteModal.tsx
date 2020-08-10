import clsx from "clsx";
import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { AnswerTeamInviteModalSteps } from "../../types/redux";
import { BareTeam, TeamWithLastActivity } from "../../types/shared";
import SimpleButton from "../generic/buttons/SimpleButton";
import WaitingIndicator from "../generic/feedback/WaitingIndicator";
import DownTransition from "../generic/transitions/DownTransition";
import styles from "./AnswerTeamInviteModal.styles";
import AcceptToJoinTeam from "./contents/AcceptToJoinTeam";
import SwitchTeam from "./contents/SwitchTeam";

interface AnswerTeamInviteModalProps {
  isOpened: boolean;
  isLoading: boolean;
  step: AnswerTeamInviteModalSteps;
  teamName: string;
  currentTeamId: string;
  teams: Array<TeamWithLastActivity>;
  onAcceptInvite: () => void;
  onSwitchTeam: (team?: BareTeam) => void;
  onClose: () => void;
}

const AnswerTeamInviteModal: React.FC<AnswerTeamInviteModalProps> = ({
  isOpened,
  isLoading,
  step,
  teamName,
  currentTeamId,
  teams,
  onAcceptInvite,
  onSwitchTeam,
  onClose,
}) => {
  const classes = styles();

  const handleDeclineToSwitchTeam = () => onSwitchTeam();

  return (
    <Dialog
      open={isOpened}
      TransitionComponent={DownTransition}
      transitionDuration={500}
      maxWidth={"xs"}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title" className={classes.title}>
        Team invite
      </DialogTitle>
      <DialogContent
        className={clsx({
          [classes.dialogContent]:
            step === AnswerTeamInviteModalSteps.SwitchTeam || isLoading,
        })}
      >
        {isLoading && (
          <div className={classes.waitingContainer}>
            <WaitingIndicator
              IconComponent={AddCircleOutlineIcon}
              text={
                "Please hold while our hamsters handle the request in our secret basement"
              }
            />
          </div>
        )}
        {!isLoading && (
          <div id="alert-dialog-slide-description">
            {
              {
                Question: <AcceptToJoinTeam teamName={teamName} />,
                SwitchTeam: (
                  <SwitchTeam
                    teams={teams}
                    currentTeamId={currentTeamId}
                    joinedTeamName={teamName}
                    onSwitchTeam={onSwitchTeam}
                  />
                ),
              }[step]
            }
          </div>
        )}
      </DialogContent>
      {!isLoading &&
        {
          Question: (
            <DialogActions>
              <SimpleButton text="Let's Join !" onClick={onAcceptInvite} />
              <SimpleButton text="Nevermind" onClick={onClose} />
            </DialogActions>
          ),
          SwitchTeam: (
            <DialogActions>
              <SimpleButton
                text="I don't want to switch team"
                onClick={handleDeclineToSwitchTeam}
              />
            </DialogActions>
          ),
        }[step]}
    </Dialog>
  );
};

export default AnswerTeamInviteModal;
