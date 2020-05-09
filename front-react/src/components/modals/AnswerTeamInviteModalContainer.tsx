import React, { useState } from "react";
import useLifecycleStatus from "../../hooks/useLifecycleStatus.hook";
import * as localStorage from "local-storage";
import LocalStorageKeys from "../../logic/local.storage.keys";
import User from "../../types/user.type";
import { useReduxDispatch, useReduxSelector } from "../../hooks/redux.hooks";
import getUserTeamsAction from "../../redux/actions/user/get.user.teams.action";
import acceptTeamInviteAction from "../../redux/actions/user/accept.team.invite.action";
import AnswerTeamInviteModal from "./AnswerTeamInviteModal";
import getTimelineAction from "../../redux/actions/user/get.timeline.action";
import BareTeam from "../../types/team.type";
import { Context } from "../../redux/types/action.types";

export enum ActionSteps {
  Question = "Question",
  SwitchTeam = "SwitchTeam",
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
  onClose,
}) => {
  const dispatch = useReduxDispatch();
  const user = useReduxSelector((state) => state.user) as User;
  const teams = useReduxSelector((state) => state.userTeams);
  const isLoading = useReduxSelector((state) => state.apiCallsInProgress > 0);
  const isMounted = useLifecycleStatus();

  const [step, setStep] = useState(ActionSteps.Question);
  const [currentTeam] = useState(
    localStorage.get<BareTeam>(LocalStorageKeys.currentTeam)
  );

  const fetchUserTeams = async () => {
    const result = await dispatch(
      getUserTeamsAction(user.id, true, Context.Modal)
    );

    if (!result.success || !result.userHasSeveralTeams) {
      onClose();
      return;
    }

    if (isMounted.current) {
      setStep(ActionSteps.SwitchTeam);
    }
  };

  const handleAcceptInvite = async () => {
    const result = await dispatch(
      acceptTeamInviteAction(requestId, Context.Modal)
    );

    if (result.success) {
      await fetchUserTeams();
    } else {
      onClose();
    }
  };

  const handleSwitchTeam = (team?: BareTeam) => {
    const currentTeam =
      team || localStorage.get<BareTeam>(LocalStorageKeys.currentTeam);

    if (team) {
      localStorage.set(LocalStorageKeys.currentTeam, team);
    }

    dispatch(getTimelineAction(currentTeam.id));
    onClose();
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
      onSwitchTeam={handleSwitchTeam}
      onAcceptInvite={handleAcceptInvite}
    />
  );
};

export default AnswerTeamInviteModalContainer;
