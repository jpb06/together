import React from "react";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { clearSnackbarAction, payloadAction } from "../../../redux/actions";
import { initialState } from "../../../redux/store/root.state";
import { connectedRender } from "../../../redux/test-utils/connected.render.helper";
import { ReduxActionType as Type, SnackbarKind } from "../../../types/redux";
import AppSnackbar, {
  snackbarKindToClassName,
  snackbarKindToIcon,
} from "./AppSnackbar";

describe("App snackbar component", () => {
  const priorAction = payloadAction(Type.Snackbar, {
    isOpen: true,
    type: SnackbarKind.Error,
    text: "Oh no!",
  });

  it("should not be displayed on init", async () => {
    const { container } = connectedRender(<AppSnackbar />);

    expect(container).toHaveTextContent("");
    expect(container.children.length).toBe(0);
  });

  it("should display a text", async () => {
    connectedRender(<AppSnackbar />, [priorAction]);

    expect(screen.getByRole("contentinfo")).toHaveTextContent("Oh no!");
  });

  it("should display an icon", async () => {
    connectedRender(<AppSnackbar />, [priorAction]);

    screen.getByRole("img", { name: /snackbar-icon/i });
  });

  it("should send an action when closed", async () => {
    const { store } = connectedRender(<AppSnackbar />, [priorAction]);

    userEvent.click(screen.getByRole("button"));
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(clearSnackbarAction());
  });

  it("should not do anything if the click wasn't on the close button", async () => {
    const { store } = connectedRender(
      <div>
        <button name="yolo">yolo man</button>
        <AppSnackbar />
      </div>,
      undefined,
      {
        state: {
          ...initialState,
          snackbar: {
            isOpen: true,
            type: SnackbarKind.Error,
            text: "Oh no!",
          },
        },
      }
    );
    userEvent.click(screen.getByRole("button", { name: /yolo/i }));
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });
});

describe("snackbarKindToIcon function", () => {
  it("should return the success icon", () => {
    const Icon = snackbarKindToIcon(SnackbarKind.Success);
    expect(Icon).toMatchObject(CheckCircleIcon);
  });

  it("should return the error icon", () => {
    const Icon = snackbarKindToIcon(SnackbarKind.Error);
    expect(Icon).toMatchObject(ErrorIcon);
  });

  it("should return the info icon", () => {
    const Icon = snackbarKindToIcon(SnackbarKind.Info);
    expect(Icon).toMatchObject(InfoIcon);
  });

  it("should return the warning icon", () => {
    const Icon = snackbarKindToIcon(SnackbarKind.Warning);
    expect(Icon).toMatchObject(WarningIcon);
  });
});

describe("snackbarKindToClassName function", () => {
  const classes = {
    success: 0,
    error: 1,
    warning: 2,
    info: 3,
  };

  it("should return the success prop", () => {
    const result = snackbarKindToClassName(SnackbarKind.Success, classes);
    expect(result).toBe(0);
  });

  it("should return the error prop", () => {
    const result = snackbarKindToClassName(SnackbarKind.Error, classes);
    expect(result).toBe(1);
  });

  it("should return the info prop", () => {
    const result = snackbarKindToClassName(SnackbarKind.Info, classes);
    expect(result).toBe(3);
  });

  it("should return the warning prop", () => {
    const result = snackbarKindToClassName(SnackbarKind.Warning, classes);
    expect(result).toBe(2);
  });
});
