import React from "react";
import { useHistory } from "react-router-dom";
import Login from "./Login";
import { loginAction } from "../../redux/actions/login.action";
import { useReduxDispatch } from "../../hooks/redux.hooks";
import { validateEmail } from "../../logic/user.util";

export interface LoginState {
  isPending: boolean;
  isSubmitted: boolean;
  isErrored: boolean;
  email: string;
  password: string;
  actionText: string;
}

const LoginContainer: React.FC = () => {
  const history = useHistory();
  const dispatch = useReduxDispatch();

  const [loginState, setLoginState] = React.useState({
    isPending: false,
    isErrored: false,
    isSubmitted: false,
    actionText: "Login",
    email: "",
    password: ""
  });

  const resetState = () => {
    setLoginState(prevState => ({
      ...prevState,
      actionText: "Login",
      isSubmitted: true,
      isErrored: false
    }));
  };

  const setStateToPending = () => {
    setLoginState(prevState => ({
      ...prevState,
      actionText: "Logging in ...",
      isPending: true
    }));
  };

  const setStateToInvalidEmail = () => {
    setLoginState(prevState => ({
      ...prevState,
      actionText: "Not a valid email",
      isPending: false,
      isErrored: true
    }));
  };

  const setStateToLoginFailure = () => {
    setLoginState(prevState => ({
      ...prevState,
      actionText: "Failure && Try again ?",
      isPending: false,
      isErrored: true
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget;

    setLoginState({
      ...loginState,
      [name]: value
    });
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    resetState();
    if (loginState.email === "" || loginState.password === "") return;
    setStateToPending();

    const isEmailValid = validateEmail(loginState.email);
    if (!isEmailValid) {
      setStateToInvalidEmail();
      return;
    }

    const authResult = await dispatch(
      loginAction(loginState.email, loginState.password)
    );
    if (!authResult.success) {
      setStateToLoginFailure();
      return;
    }

    history.push({
      pathname: "/main"
    });
  };

  return (
    <Login state={loginState} onChange={handleChange} onSubmit={handleSubmit} />
  );
};

export default LoginContainer;
