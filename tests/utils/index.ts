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
  const validSelector = await page.evaluate(
    ({ selector }) => {
      if (!document.querySelector(selector)) {
        console.error(`No elements found with selector: ${selector}`);
        return false;
      } else if (document.querySelectorAll(selector).length > 1) {
        console.error(`Multiple elements found with selector: ${selector}`);
        return false;
      } else {
        return true;
      }
    },
    { selector }
  );
  await page.keyboard.press("Tab");

  const foundTarget = await page.evaluate(
    ({ selector, visited }) => {
      const target = document.querySelector(selector);
      const focused = document.activeElement;

      if (focused === target) {
        console.log(`Element with selector ${selector} is focused`);
        return true;
      }

      if (!document.activeElement) return false;

      // @ts-ignore
      if (visited.includes(focused)) {
        console.error(
          `Element with selector ${selector} is not a tabbable element`
        );
        return false;
      }

      // @ts-ignore
      visited.push(focused);
    },
    { selector, visited }
  );

  if (validSelector && !foundTarget) return tabTo(page, selector, visited);
};
