import React from "react";
import NewAccount from "./NewAccount";
import { useReduxSelector, useReduxDispatch } from "../../../hooks/redux.hooks";
import { isNewUserDataValid } from "../../../logic/user.util";
import { NewUser } from "../../../types/user.type";
import CreateUserAction from "../../../redux/actions/account-creation/create.user.action";
import { useHistory } from "react-router";
import TogetherApi from "../../../api/setup/together.api";
import createTeamAction from "../../../redux/actions/account-creation/create.team.action";
import requestTojoinTeamAction from "../../../redux/actions/account-creation/request.to.join.team.action";
import { notice } from "../../../redux/actions/util/generic.actions";
import {
  CREATE_USER_DATA_SUBMITTED,
  AVATAR_CHOSEN,
} from "../../../redux/actions/util/action.types";

export enum TeamActionType {
  Create,
  Join,
}

const NewAccountContainer: React.FC = () => {
  const history = useHistory();
  const dispatch = useReduxDispatch();

  const newAccountState = useReduxSelector(
    (state) => state.accountCreationState
  );
  const loggedUser = useReduxSelector((state) => state.user);

  const handleUserCreation = async (user: NewUser) => {
    dispatch(notice(CREATE_USER_DATA_SUBMITTED));

    if (!isNewUserDataValid(user)) return;

    const result = await dispatch(CreateUserAction(user));
    if (result.success) {
      TogetherApi.setup(history);
    }
  };

  const handleAvatarChosen = async () => {
    dispatch(notice(AVATAR_CHOSEN));
  };

  const handleTeamAction = async (name: string, actionType: TeamActionType) => {
    if (name === "") return;

    switch (actionType) {
      case TeamActionType.Create:
        dispatch(createTeamAction(name));
        break;
      case TeamActionType.Join:
        const result = await dispatch(requestTojoinTeamAction(name));
        if (result.success) {
          history.push({
            pathname: "/main",
          });
        }
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
