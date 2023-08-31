import { test, expect, Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Appcenter home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://amazon.com/b2b/appcenter");
  });

  // test("passes axe-core a11y scan", async ({ page }) => {
  //   const a11yScanResults = await new AxeBuilder({ page })
  //     .withTags(["wcag2a"])
  //     .include("#bui-root")
  //     .exclude(".b-button") // bui buttons fail a11y scans
  //     .analyze();
  //   console.log(
  //     `Number of a11y violations axe found on home page is: ${a11yScanResults.violations.length}`
  //   );
  //   expect(a11yScanResults.violations).toEqual([]);
  // });

  test("test util functions", async ({ page }) => {
    const validSelector =
      '[data-testid="bws-marketplace-homepage-category-card-accountManagement"]';
    const mulipleElementsSelector = ".b-button";
    const noElementSelector = ".bad-selector";
    const selector = validSelector;

    // const elements = await page.locator(selector).all();
    // if (elements.length > 1)
    //   throw new Error(`Multiple elements found matching selector: ${selector}`);

    // const isVisible = await page.locator(selector).isVisible();
    // if (!isVisible)
    //   throw new Error(`No elements found matching selector: ${selector}`);

    // actual algorithm starts here

    // await page.evaluate(() => {
    //   const q1 = document.querySelector(
    //     '[data-testid="bws-marketplace-homepage-category-card-accountManagement"]'
    //   );
    //   const q2 = document.querySelector(
    //     '[data-testid="bws-marketplace-homepage-category-card-rewardAndRecognition"]'
    //   );
    //   console.log(`[DEBUG] ${q1 === q2}`); // this works???
    // });

    // keep array of elements we have visited
    const visited: Element[] = [];
    let focused;

    await page.keyboard.press("Tab");

    while (!visited.includes(focused)) {
      await page.evaluate(
        ({ selector, focused, visited }) => {
          const element = document.querySelector(selector);
          focused = document.activeElement;
          if (element === focused) return;

          visited.push(focused);
        },
        {
          selector,
          focused,
          visited,
        }
      );
      await page.keyboard.press("Tab");
    }

    // tab until the element we are looking for is active or the active element is first element we saw

    // while (curActive !== seen[0]) {
    //   console.log(seen);
    //   console.log(curActive === element); // evaluates to true?
    //   if (curActive === element) return;
    //   seen.push(curActive);
    //   await page.keyboard.press("Tab");
    //   curActive = await page.evaluate(() => document.activeElement);
    // }
    await page.keyboard.press("Enter");
  });

  //   test("can tab to category card and press enter to go to proper app list url", async ({
  //     page,
  //   }) => {
  //     //bws-marketplace-homepage-category-card-accountManagement
  //     await page
  //       .locator(
  //         '[data-testid="bws-marketplace-homepage-category-card-accountManagement"]'
  //       )
  //       .click();
  //     expect(page.url()).toBe(
  //       "https://www.amazon.com/b2b/appcenter/apps?categories=accountManagement"
  //     );
  //   });
});
