import { createMemoryHistory } from "history";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { Action, createStore } from "redux";

import { render as rtlRender, RenderOptions } from "@testing-library/react";

import rootReducer from "../../redux/reducers";
import { RootState } from "../../redux/store/root.state";

export interface CustomOptions extends RenderOptions {
  state: RootState;
}

export function connectedRender(
  ui: React.ReactElement,
  priorActions?: Array<Action>,
  options?: CustomOptions
) {
  // Wrap dispatch in a mock so it can be spied on.
  const store = createStore(rootReducer, options?.state);

  if (priorActions) {
    for (let i = 0; i < priorActions.length; i++) {
      store.dispatch(priorActions[i]);
    }
  }

  store.dispatch = jest.fn(store.dispatch);
  const history = createMemoryHistory();

  function providerWrapper({
    children,
  }: {
    children: React.ReactElement;
  }): React.ReactElement {
    return (
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    );
  }

  const returns = rtlRender(ui, {
    wrapper: providerWrapper as React.ComponentType,
    ...options,
  });

  return { store, history, ...returns };
}
