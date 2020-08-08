import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { validateEmail } from "../../../../../logic/user.util";
import { inviteUserToTeamAction } from "../../../../../redux/actions";
import { AccountCreationState, ReduxActionContext as Context } from "../../../../../types/redux";
import { User } from "../../../../../types/shared";
import AddTeamMembersStepForm from "./AddTeamMembersStepForm";

interface AddTeamMembersStepContainerProps {
  state: AccountCreationState;
  user: User;
}

const AddTeamMembersStepContainer: React.FC<AddTeamMembersStepContainerProps> = ({
  state,
  user,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const handleGoToTimeline = () => {
    history.push({
      pathname: "/main",
    });
  };

  const handleTeamInvitation = async () => {
    if (!validateEmail(email)) return;

    dispatch(
      inviteUserToTeamAction(user.teams[0].id, email, Context.Onboarding)
    );
    setEmail("");
  };

  return (
    <AddTeamMembersStepForm
      state={state}
      email={email}
      teamMembers={state.newTeamMembers}
      exitActionText={state.exitActionText}
      onChange={handleChange}
      onTeamInviteSent={handleTeamInvitation}
      onGoToTimeline={handleGoToTimeline}
    />
  );
};

export default AddTeamMembersStepContainer;
