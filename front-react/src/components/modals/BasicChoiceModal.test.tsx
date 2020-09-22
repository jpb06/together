import React from "react";

import { logRoles, render, screen } from "@testing-library/react";

import BasicChoiceModal from "./BasicChoiceModal";

describe("Basic choice modal component", () => {
  const handleClose = jest.fn();
  const handleConfirm = jest.fn();

  it("should display a loading indicator", () => {
    const state = {
      isOpened: true,
      isLoading: true,
      title: "Yolo",
      question: "Are vegetables O.K?",
      accept: "Yes",
      refuse: "No",
    };

    const { container } = render(
      <BasicChoiceModal
        state={state}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    );

    screen.getByText(
      /Please hold while our hamsters handle the request in our secret basement/i
    );
    screen.getByRole("img", { name: /waiting-icon/i });
  });
});
