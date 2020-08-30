import React from "react";

import { AccountCreationState, AccountCreationStep } from "../../../../../types/redux";
import { User } from "../../../../../types/shared";
import UserAvatarStepForm from "./UserAvatarStepForm";

interface UserAvatarStepContainerProps {
  state: AccountCreationState;
  user: User;
  onAvatarChosen: () => void;
}

const UserAvatarStepContainer: React.FC<UserAvatarStepContainerProps> = ({
  state,
  user,
  onAvatarChosen,
}) => {
  if (state.step !== AccountCreationStep.Avatar) return null;

  return (
    <UserAvatarStepForm
      state={state}
      user={user}
      onAvatarChosen={onAvatarChosen}
    />
  );
};

export default UserAvatarStepContainer;
