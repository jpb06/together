import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { useRootSelector } from "../../../hooks";
import { validateEmail } from "../../../logic/user.util";
import { payloadAction } from "../../../redux/actions";
import { loginAction } from "../../../redux/actions/user/login.action";
import { loginStateSelector } from "../../../redux/selectors";
import { ReduxActionType as Type } from "../../../types/redux";
import Login from "./Login";

export interface LoginForm {
  email: string;
  password: string;
}

const LoginContainer: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loginState = useRootSelector(loginStateSelector);

  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    dispatch(payloadAction(Type.LoginStateRetry));
    if (credentials.email === "" || credentials.password === "") return;
    dispatch(payloadAction(Type.LoginStatePending));

    const isEmailValid = validateEmail(credentials.email);
    if (!isEmailValid) {
      dispatch(payloadAction(Type.LoginStateInvalidEmail));
      return;
    }

    dispatch(loginAction(credentials.email, credentials.password, history));
  };

  return (
    <Login
      form={credentials}
      state={loginState}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default LoginContainer;
