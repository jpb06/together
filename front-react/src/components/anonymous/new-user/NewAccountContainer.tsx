import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { useRootSelector } from "../../../hooks";
import { isNewUserDataValid } from "../../../logic/user.util";
import {
    createTeamAction, createUserAction, payloadAction, requestToJoinTeamAction
} from "../../../redux/actions";
import { accountCreationStateSelector, userSelector } from "../../../redux/selectors";
import { NewUser } from "../../../stack-shared-code/types";
import { ReduxActionContext as Context } from "../../../types/redux";
import { ReduxActionType as Type } from "../../../types/redux/redux.action.types";
import NewAccount from "./NewAccount";

export enum TeamActionType {
  Create,
  Join,
}

const NewAccountContainer: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const newAccountState = useRootSelector(accountCreationStateSelector);
  const loggedUser = useRootSelector(userSelector);

  const handleUserCreation = (user: NewUser) => {
    dispatch(payloadAction(Type.OnboardingFormSubmitted));

    if (!isNewUserDataValid(user)) return;

    dispatch(createUserAction(user, history, Context.Onboarding));
  };

  const handleAvatarChosen = () => dispatch(payloadAction(Type.AvatarChosen));

  const handleTeamAction = (name: string, actionType: TeamActionType) => {
    dispatch(payloadAction(Type.OnboardingFormSubmitted));
    if (name === "") return;

    switch (actionType) {
      case TeamActionType.Create:
        dispatch(createTeamAction(name, Context.Onboarding));
        break;
      case TeamActionType.Join:
        dispatch(requestToJoinTeamAction(name, history, Context.Onboarding));
        break;
    }
  };

  return (
    <NewAccount
      state={newAccountState}
      loggedUser={loggedUser}
      onUserCreation={handleUserCreation}
      onAvatarChosen={handleAvatarChosen}
      onTeamAction={handleTeamAction}
    />
  );
};

export default NewAccountContainer;
