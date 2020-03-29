import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DownTransition from "../generic/transitions/DownTransition";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DialogActions from "@material-ui/core/DialogActions";
import SimpleButton from "../generic/buttons/SimpleButton";
import clsx from "clsx";
import WaitingIndicator from "../feedback/WaitingIndicator";
import AcceptToJoinTeam from "./contents/AcceptToJoinTeam";
import SwitchTeam from "./contents/SwitchTeam";
import styles from "./AnswerTeamInviteModal.styles";
import { ActionSteps } from "./AnswerTeamInviteModalContainer";
import BareTeam, { TeamWithLastActivity } from "../../types/team.type";

interface AnswerTeamInviteModalProps {
  isOpened: boolean;
  isLoading: boolean;
  step: ActionSteps;
  title: string;
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
  title,
  teamName,
  currentTeamId,
  teams,
  onAcceptInvite,
  onSwitchTeam,
  onClose
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
        {title}
      </DialogTitle>
      <DialogContent
        className={clsx({
          [classes.dialogContent]: step === ActionSteps.SwitchTeam || isLoading
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
                )
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
          )
        }[step]}
    </Dialog>
  );
};

export default AnswerTeamInviteModal;
