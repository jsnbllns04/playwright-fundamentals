import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/');
})

test('Dark mode', async ({ page }) => {
  await page.getByRole('button', { name: 'Light' }).click();
  await page.getByText('Dark').click();
})

test('Datepicker', async ({ page }) => {
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.getByRole('link', { name: 'Datepicker' }).click();
  await page.getByRole('textbox', { name: 'Form Picker' }).click();
  await page.getByText('7', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Range Picker' }).click();
  await page.getByText('10').click();
  await page.getByRole('textbox', { name: 'Min Max Picker' }).click();
  await page.getByText('11').click();
})

test('Form Layouts', async ({ page }) => {
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.getByRole('link', { name: 'Form Layouts' }).click();

  const rememberMeSubmit = page.locator('form').filter({ hasText: 'Remember meSubmit' })

  await rememberMeSubmit.getByPlaceholder('Email').click();
  await rememberMeSubmit.getByPlaceholder('Email').fill('test@test.com');
  await page.locator('.custom-checkbox').first().click();
  await rememberMeSubmit.getByLabel('Remember me').check();
  await rememberMeSubmit.getByRole('button').click();
  await page.getByRole('textbox', { name: 'Jane Doe' }).click();
  await page.getByRole('textbox', { name: 'Jane Doe' }).fill('Jason Billones');
})

