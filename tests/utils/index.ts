import { Page } from "@playwright/test";

/**
 * Presses the tab key until the element with the given selector is in focus.
 * @param selector css selector for element you want to tab to
 */
export const tabToElement = async (
  page: Page,
  selector: string
): Promise<void> => {
  await tabTo(page, selector);
};

const tabTo = async (
  page: Page,
  selector: string,
  visited: Element[] = []
): Promise<void> => {
  page.evaluate(
    ({ selector }) => {
      if (!document.querySelector(selector)) {
        console.error(`No elements found with selector: ${selector}`);
        return;
      }

      if (document.querySelectorAll(selector).length > 0) {
        console.error(`Multiple elements found with selector: ${selector}`);
        return;
      }
    },
    { selector }
  );
  await page.keyboard.press("Tab");

  await page.evaluate(
    ({ selector, visited }) => {
      const target = document.querySelector(selector);
      const focused = document.activeElement;

      if (focused === target) {
        console.log(`Element with selector ${selector} is focused`);
        return;
      }

      if (!document.activeElement) return;

      // @ts-ignore
      if (visited.includes(focused)) {
        console.error(
          `Element with selector ${selector} is not a tabbable element`
        );
      }

      // @ts-ignore
      visited.push(focused);
    },
    { selector, visited }
  );

  return tabTo(page, selector, visited);
};
