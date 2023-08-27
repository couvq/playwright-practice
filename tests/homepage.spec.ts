import { test, expect, Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Appcenter home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://amazon.com/b2b/appcenter");
  });

  test("passes axe-core a11y scan", async ({ page }) => {
    const a11yScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a"])
      .include("#bui-root")
      .exclude(".b-button") // bui buttons fail a11y scans
      .analyze();
    console.log(
      `Number of a11y violations axe found on home page is: ${a11yScanResults.violations.length}`
    );
    expect(a11yScanResults.violations).toEqual([]);
  });

  test("test util functions", async ({ page }) => {
    const validSelector =
      '[data-testid="bws-marketplace-homepage-category-card-accountManagement"]';
    const mulipleElementsSelector = ".b-button";
    const noElementSelector = ".bad-selector";
    const selector = validSelector;

    const elements = await page.locator(selector).all();
    if (elements.length > 1)
      throw new Error(`Multiple elements found matching selector: ${selector}`);

    const isVisible = await page.locator(selector).isVisible();
    if (!isVisible)
      throw new Error(`No elements found matching selector: ${selector}`);

    const element = page.locator(selector);
    console.log(`Element we are looking for is : ${element}`);

    // first tab
    await page.keyboard.press("Tab");
    let firstFocusedElement,
      focusedElement = page.locator(":focus");
      console.log(firstFocusedElement)

    // while (focusedElement !== element) {
    //   page.keyboard.press("Tab");
    //   // how am I going to break this loop?
    //   // keep tabbing until I have either found the element I am looking for or until I have hit first element we focused
    // }
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
