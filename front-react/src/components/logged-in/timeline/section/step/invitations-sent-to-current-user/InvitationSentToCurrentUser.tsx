import * as localStore from "local-storage";
import React from "react";
import { useDispatch } from "react-redux";

import { Typography } from "@material-ui/core";

import LocalStorageKeys from "../../../../../../logic/local.storage.keys";
import {
    getTimelineAction, showAnswerTeamInviteModalAction
} from "../../../../../../redux/actions";
import {
    answerTeamInviteAction
} from "../../../../../../redux/actions/user/answer.team.invite.action";
import { TeamInviteAnswer } from "../../../../../../redux/tasks";
import { BareTeam, TeamInvite } from "../../../../../../types/shared";
import SimpleButton from "../../../../../generic/buttons/SimpleButton";
import AnswerTeamInviteModalContainer from "../../../../../modals/AnswerTeamInviteModalContainer";
import BasicChoiceModal, { BasicChoiceModalState } from "../../../../../modals/BasicChoiceModal";
import RefuseToJoinTeam from "../../../../../modals/contents/RefuseToJoinTeam";
import styles from "./InvitationSentToCurrentUser.styles";

interface InvitationSentToCurrentUserProps {
  invite: TeamInvite;
}

const InvitationSentToCurrentUser: React.FC<InvitationSentToCurrentUserProps> = ({
  invite,
}) => {
  const classes = styles();
  const dispatch = useDispatch();

  const [declineInviteState, setDeclineInviteState] = React.useState<
    BasicChoiceModalState
  >({
    isOpened: false,
    isLoading: false,
    title: "Decline invite",
    question: <RefuseToJoinTeam teamName={invite.team.name} />,
    accept: "Decline",
    refuse: "Nevermind",
  });

  const openJoinModal = () => dispatch(showAnswerTeamInviteModalAction(true));

  const toggleDeclineModal = () =>
    setDeclineInviteState((state) => ({ ...state, isOpened: !state.isOpened }));
  const declineInvite = () => {
    dispatch(answerTeamInviteAction(invite.id, TeamInviteAnswer.Declined));
    const currentTeam = localStore.get<BareTeam>(LocalStorageKeys.currentTeam);
    dispatch(getTimelineAction(currentTeam.id));
    toggleDeclineModal();
  };

  return (
    <div className={classes.root}>
      You have been invited to join team{" "}
      <Typography component="span" variant="body2" color="textSecondary">
        {invite.team.name}
      </Typography>{" "}
      by{" "}
      <Typography
        component="span"
        variant="body2"
        color="textSecondary"
      >{`${invite.referrer.firstName} ${invite.referrer.lastName}`}</Typography>
      .
      <div className={classes.actions}>
        <SimpleButton text="Join" onClick={openJoinModal} />
        &nbsp;
        <SimpleButton text="Decline" onClick={toggleDeclineModal} />
      </div>
      <AnswerTeamInviteModalContainer
        inviteId={invite.id}
        teamName={invite.team.name}
      />
      <BasicChoiceModal
        state={declineInviteState}
        onConfirm={declineInvite}
        onClose={toggleDeclineModal}
      />
    </div>
  );
};

export default InvitationSentToCurrentUser;
