import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { useRootSelector } from "../../../hooks";
import { isNewUserDataValid } from "../../../logic/user.util";
import {
    createTeamAction, createUserAction, payloadAction, requestToJoinTeamAction
} from "../../../redux/actions";
import { accountCreationStateSelector, userSelector } from "../../../redux/selectors";
import { ReduxActionContext as Context } from "../../../types/redux";
import { ReduxActionType as Type } from "../../../types/redux/redux.action.types";
import { NewUser } from "../../../types/shared";
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

  const handleUserCreation = async (user: NewUser) => {
    dispatch(payloadAction(Type.CreateUserDataSubmitted));

    if (!isNewUserDataValid(user)) return;

    dispatch(createUserAction(user, history, Context.Onboarding));
  };

  const handleAvatarChosen = async () =>
    dispatch(payloadAction(Type.AvatarChosen));

  const handleTeamAction = async (name: string, actionType: TeamActionType) => {
    if (name === "") return;

    if (actionType === TeamActionType.Create) {
      dispatch(createTeamAction(name, Context.Onboarding));
    } else if (actionType === TeamActionType.Join) {
      dispatch(requestToJoinTeamAction(name, history, Context.Onboarding));
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
