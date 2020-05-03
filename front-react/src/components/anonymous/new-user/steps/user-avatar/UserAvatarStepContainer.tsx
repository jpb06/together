import React from "react";
import UserAvatarStepForm from "./UserAvatarStepForm";
import User from "../../../../../types/user.type";
import {
  AccountCreationState,
  AccountCreationStep,
} from "../../../../../redux/types/account.creation.state.type";

interface UserAvatarStepContainerProps {
  state: AccountCreationState;
  user: User | null;
  onAvatarChosen: () => void;
}

const UserAvatarStepContainer: React.FC<UserAvatarStepContainerProps> = ({
  state,
  user,
  onAvatarChosen,
}) => {
  if (state.step !== AccountCreationStep.Avatar || !user) return null;

  return (
    <UserAvatarStepForm
      state={state}
      user={user}
      onAvatarChosen={onAvatarChosen}
    />
  );
};

export default UserAvatarStepContainer;
