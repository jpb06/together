import React, { useState } from "react";
import User, { TeamMember, TerseUser } from "../../../../../types/user.type";
import AddTeamMembersStepForm from "./AddTeamMembersStepForm";
import { validateEmail } from "../../../../../logic/user.util";
import { useHistory } from "react-router";
import inviteUserToTeamAction from "../../../../../redux/actions/account-creation/invite.user.to.team.action";
import { useReduxDispatch } from "../../../../../hooks/redux.hooks";
import { AccountCreationState } from "../../../../../redux/types/account.creation.state.type";
import { Context } from "../../../../../redux/types/action.types";

interface AddTeamMembersStepContainerProps {
  state: AccountCreationState;
  user: User;
}

const AddTeamMembersStepContainer: React.FC<AddTeamMembersStepContainerProps> = ({
  state,
  user,
}) => {
  const history = useHistory();
  const dispatch = useReduxDispatch();

  const [teamMembers, setTeamMembers] = useState<Array<TeamMember>>([
    {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatarName: user.avatarName,
      status: "Team creator",
      joinDate: new Date(),
    },
  ]);
  const [exitActionText, setExitActionText] = useState(
    "No thanks, bring me to my timeline!"
  );
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

    const result = await dispatch(
      inviteUserToTeamAction(user.teams[0].id, email, Context.AccountCreation)
    );

    if (result.success) {
      setTeamMembers((requests) =>
        requests.concat({
          ...(result.user as TerseUser),
          status: "Invite sent",
          joinDate: new Date(),
        })
      );
      setExitActionText("I'm done! Bring me to my timeline!");
      setEmail("");
    }
  };

  return (
    <AddTeamMembersStepForm
      state={state}
      email={email}
      teamMembers={teamMembers}
      exitActionText={exitActionText}
      onChange={handleChange}
      onTeamInviteSent={handleTeamInvitation}
      onGoToTimeline={handleGoToTimeline}
    />
  );
};

export default AddTeamMembersStepContainer;
