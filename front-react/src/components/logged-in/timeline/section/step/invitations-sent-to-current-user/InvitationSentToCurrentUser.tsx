import React from "react";
import { Typography } from "@material-ui/core";
import styles from "./InvitationSentToCurrentUser.styles";
import { TeamInvite } from "../../../../../../types/invites.type";
import SimpleButton from "../../../../../generic/buttons/SimpleButton";
import BasicChoiceModal, {
  BasicChoiceModalState
} from "../../../../../modals/BasicChoiceModal";
import RefuseToJoinTeam from "../../../../../modals/contents/RefuseToJoinTeam";
import AnswerTeamInviteModalContainer from "../../../../../modals/AnswerTeamInviteModalContainer";
import { useReduxDispatch } from "../../../../../../hooks/redux.hooks";
import declineTeamInviteAction from "../../../../../../redux/actions/decline.team.invite.action";
import getTimelineAction from "../../../../../../redux/actions/get.timeline.action";
import * as localStorage from "local-storage";
import LocalStorageKeys from "../../../../../../logic/local.storage.keys";
import BareTeam from "../../../../../../types/team.type";

interface InvitationSentToCurrentUserProps {
  invite: TeamInvite;
}

const InvitationSentToCurrentUser: React.FC<InvitationSentToCurrentUserProps> = ({
  invite
}) => {
  const classes = styles();
  const dispatch = useReduxDispatch();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [declineInviteState, setDeclineInviteState] = React.useState<
    BasicChoiceModalState
  >({
    isOpened: false,
    isLoading: false,
    title: "Decline invite",
    question: <RefuseToJoinTeam teamName={invite.team.name} />,
    accept: "Decline",
    refuse: "Nevermind"
  });

  const openJoinModal = () => setIsModalOpen(true);
  const closeJoinModal = () => setIsModalOpen(false);

  const toggleDeclineModal = () =>
    setDeclineInviteState(state => ({ ...state, isOpened: !state.isOpened }));
  const declineInvite = () => {
    dispatch(declineTeamInviteAction(invite.id));
    const currentTeam = localStorage.get<BareTeam>(
      LocalStorageKeys.currentTeam
    );
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
        isOpened={isModalOpen}
        title="Team invite"
        requestId={invite.id}
        teamName={invite.team.name}
        onClose={closeJoinModal}
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
