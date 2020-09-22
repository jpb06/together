import React from "react";

import { render } from "@testing-library/react";

import ColoredCard from "./ColoredCard";

describe("Colored card component", () => {
  it("should have children", () => {
    const { container, debug } = render(
      <ColoredCard backgroundColor="black" children={<>yolo</>} />
    );

    expect(container).toHaveTextContent("yolo");
  });

  it("should have the correct background color", () => {
    const color = "black";
    const { container } = render(
      <ColoredCard backgroundColor={color} children={<>yolo</>} />
    );

    expect(container.children[0]).toHaveStyle(`background-color: ${color};`);
  });
});
