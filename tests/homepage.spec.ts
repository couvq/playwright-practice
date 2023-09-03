import { test, expect, Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { tabToElement } from "./utils";

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    const playgroundUrl = "https://melodic-hamster-45acd5.netlify.app";
    const appCenterUrl = "https://amazon.com/b2b/appcenter";
    await page.goto(appCenterUrl);
  });

  test("test tabToElement function", async ({ page }) => {
    await tabToElement(
      page,
      '[data-testid="bws-marketplace-homepage-category-card-accountManagement"]'
    );
    expect(
      page.locator(
        '[data-testid="bws-marketplace-homepage-category-card-accountManagement"]'
      )
    ).toBeFocused(); // this passes now with tabToElement function
    await page.keyboard.press("Enter");
    expect(page.url()).toBe(
      "https://www.amazon.com/b2b/appcenter/apps?categories=accountManagement"
    ); // this does not pass for some reason
  });
});
