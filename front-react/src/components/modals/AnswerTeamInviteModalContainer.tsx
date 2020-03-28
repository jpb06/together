import React, { useState } from "react";
import useLifecycleStatus from "../../hooks/useLifecycleStatus.hook";
import * as localStorage from "local-storage";
import LocalStorageKeys from "../../logic/local.storage.keys";
import Team from "../../types/team.type";
import User from "../../types/user.type";
import { useReduxDispatch, useReduxSelector } from "../../hooks/redux.hooks";
import getUserTeamsAction from "../../redux/actions/get.user.teams.action";
import acceptTeamInviteAction from "../../redux/actions/accept.team.invite.action";
import AnswerTeamInviteModal from "./AnswerTeamInviteModal";

export enum ActionSteps {
  Question = "Question",
  SwitchTeam = "SwitchTeam"
}

interface AnswerTeamInviteModalContainerProps {
  isOpened: boolean;
  title: string;
  requestId: string;
  teamName: string;
  onClose: () => void;
}

const AnswerTeamInviteModalContainer: React.FC<AnswerTeamInviteModalContainerProps> = ({
  isOpened,
  title,
  requestId,
  teamName,
  onClose
}) => {
  const dispatch = useReduxDispatch();
  const teams = useReduxSelector(state => state.userTeams);
  const isLoading = useReduxSelector(state => state.apiCallsInProgress > 0);
  const isMounted = useLifecycleStatus();

  const [step, setStep] = useState(ActionSteps.Question);
  const [currentTeam] = useState(
    localStorage.get<Team>(LocalStorageKeys.currentTeam)
  );

  const fetchUserTeams = async () => {
    const currentUser = localStorage.get<User>(LocalStorageKeys.user);
    const result = await dispatch(getUserTeamsAction(currentUser.id));

    if (!isMounted.current) return;
    if (!result.success || !result.userHasSeveralTeams) {
      onClose();
      return;
    }

    setStep(ActionSteps.SwitchTeam);
  };

  const handleAcceptInvite = async () => {
    const result = await dispatch(acceptTeamInviteAction(requestId));

    if (!isMounted.current) return;

    if (result.success) {
      await fetchUserTeams();
    } else {
      onClose();
    }
  };

  return (
    <AnswerTeamInviteModal
      isOpened={isOpened}
      isLoading={isLoading}
      step={step}
      title={title}
      teamName={teamName}
      currentTeamId={currentTeam.id}
      teams={teams}
      onClose={onClose}
      onAcceptInvite={handleAcceptInvite}
    />
  );
};

export default AnswerTeamInviteModalContainer;
