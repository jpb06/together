import { MatcherFunction, screen } from "@testing-library/react";

type Query = (f: MatcherFunction) => HTMLElement;

const withMarkup = (query: Query) => (
  text: string
): HTMLElement | undefined => {
  try {
    return query((content: string, node: HTMLElement) => {
      const hasText = (node: HTMLElement) => node.textContent === text;
      const childrenDontHaveText = Array.from(node.children).every(
        (child) => !hasText(child as HTMLElement)
      );
      return hasText(node) && childrenDontHaveText;
    });
  } catch (err) {
    console.log(`Unable to find text: ${text}`);
    screen.debug();
  }
};

export const getTextWithMarkup = withMarkup(screen.getByText);
