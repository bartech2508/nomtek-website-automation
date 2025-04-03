import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Header Navigation Tests', () => {
  test('Header navigation elements should be visible and have correct text', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    await homePage.verifyHeaderLinksVisible();
    await homePage.verifyHeaderLinksText();
  });

  test('Header navigation should work correctly', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    await homePage.verifyNavigationWorks();
  });

  test('Header should maintain state after page reload', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    await homePage.verifyHeaderPersistsAfterReload();
  });

  test('Header should be sticky when scrolling', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    await homePage.verifyStickyHeader();
  });
});


/* 
test('Verify labs slider has 7 slides', async ({ page }) => {
  const homePage = new HomePage(page);
  
  await page.goto('/');
  await homePage.handleCookieDialog();
  
  // Verify the slider
  await homePage.verifySlider(7);
});
*/