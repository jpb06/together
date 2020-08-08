import * as localStore from "local-storage";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useRootSelector } from "../../hooks";
import LocalStorageKeys from "../../logic/local.storage.keys";
import {
    answerTeamInviteAction, getTimelineAction, showAnswerTeamInviteModalAction
} from "../../redux/actions";
import { answerTeamInviteModalStateSelector, userTeamsSelector } from "../../redux/selectors";
import { isAppBusyIn } from "../../redux/selectors/app.status.selectors";
import { TeamInviteAnswer } from "../../redux/tasks/user/answer.team.invite.task";
import { ReduxActionContext as Context } from "../../types/redux";
import { BareTeam } from "../../types/shared";
import AnswerTeamInviteModal from "./AnswerTeamInviteModal";

interface AnswerTeamInviteModalContainerProps {
  inviteId: string;
  teamName: string;
}

const AnswerTeamInviteModalContainer: React.FC<AnswerTeamInviteModalContainerProps> = ({
  inviteId,
  teamName,
}) => {
  const dispatch = useDispatch();
  const { userTeams, isLoading, modalState } = useRootSelector((state) => ({
    userTeams: userTeamsSelector(state),
    isLoading: isAppBusyIn(Context.Modal)(state),
    modalState: answerTeamInviteModalStateSelector(state),
  }));
  const [currentTeam] = useState(
    localStore.get<BareTeam>(LocalStorageKeys.currentTeam)
  );

  const handleAcceptInvite = () => {
    dispatch(
      answerTeamInviteAction(
        inviteId,
        TeamInviteAnswer.Accepted,
        true,
        Context.Modal
      )
    );
  };

  const handleSwitchTeam = (team?: BareTeam) => {
    const currentTeam =
      team || localStore.get<BareTeam>(LocalStorageKeys.currentTeam);

    if (team) {
      localStore.set(LocalStorageKeys.currentTeam, team);
    }

    dispatch(getTimelineAction(currentTeam.id, Context.Modal));
  };

  const handleClose = () => dispatch(showAnswerTeamInviteModalAction(false));

  return (
    <AnswerTeamInviteModal
      isOpened={modalState.isModalOpen}
      isLoading={isLoading}
      step={modalState.step}
      teamName={teamName}
      currentTeamId={currentTeam.id}
      teams={userTeams}
      onClose={handleClose}
      onSwitchTeam={handleSwitchTeam}
      onAcceptInvite={handleAcceptInvite}
    />
  );
};

export default AnswerTeamInviteModalContainer;
