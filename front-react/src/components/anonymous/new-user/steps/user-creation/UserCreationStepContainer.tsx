import React, { useState } from "react";
import UserCreationStepForm from "./UserCreationStepForm";
import {
  AccountCreationStep,
  AccountCreationState,
} from "../../../../../redux/types/account.creation.state.type";
import { NewUser } from "../../../../../types/user.type";

interface UserCreationStepContainerProps {
  state: AccountCreationState;
  onUserCreation: (user: NewUser) => void;
}

const UserCreationStepContainer: React.FC<UserCreationStepContainerProps> = ({
  state,
  onUserCreation,
}) => {
  const [newUser, setNewUser] = useState<NewUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (state.step !== AccountCreationStep.User) return null;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onUserCreation(newUser);
  };

  return (
    <UserCreationStepForm
      user={newUser}
      state={state}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default UserCreationStepContainer;
