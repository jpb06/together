import { createMemoryHistory } from "history";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createStore } from "redux";

import { render as rtlRender, RenderOptions } from "@testing-library/react";

import rootReducer from "../reducers";
import { RootState } from "../store/root.state";

export interface CustomOptions extends RenderOptions {
  state: RootState;
}

export function connectedRender(
  ui: React.ReactElement,
  options?: CustomOptions
) {
  // Wrap dispatch in a mock so it can be spied on.
  const store = createStore(rootReducer, options?.state);
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
