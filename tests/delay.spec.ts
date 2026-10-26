import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
    testInfo.setTimeout(testInfo.timeout + 10000);
    await page.goto('https://playground.bondaracademy.com/');
    await page.getByText('Modal & Overlays ').click();
    await page.getByText('Dialog').click();
})

test('alternative waits', async ({ page }) => {
  //test.setTimeout(10000);
    const threeSecondDelayButton = page.getByRole('button', { name: 'Open with delay 3 seconds' });
    await threeSecondDelayButton.click();

    const dialogContainer = page.locator('nb-dialog-container');

    //-wait for element to be attached to the DOM
    //await dialogContainer.waitFor();
    //await page.waitForSelector('nb-dialog-container', { state: 'visible' });
    
    //-wait for API response
    await page.waitForResponse('**/delay/*');

    //-wait for load state of the page (not recommended)
    // await page.waitForLoadState('networkidle');

    await expect(dialogContainer.locator('nb-card-header')).toHaveText('Friendly reminder');

    const dialogButton = page.getByRole('button', { name: 'OK' });
    await dialogButton.click({timeout: 4000});
})
