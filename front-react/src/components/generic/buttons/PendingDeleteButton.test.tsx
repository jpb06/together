import React from "react";

import { render, screen } from "@testing-library/react";

import PendingDeleteButton from "./PendingDeleteButton";

describe("Pending delete button component", () => {
  it("should display a delete icon and a pending progress", () => {
    render(<PendingDeleteButton />);

    screen.getByRole("img", { name: /delete-icon/i });
    screen.getByRole("progressbar", { name: "circular-pending" });
  });
});
