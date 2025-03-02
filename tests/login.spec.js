import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/login'); 
    });

    test('Should fill the login form and submit', async ({ page }) => {
        await page.fill('input[name="email"]', 'testuser@example.com');
        await page.fill('input[name="password"]', 'Test@1234');

        await page.click('button:has-text("Login")');

        // Wait a bit for redirection to homepage
        await page.waitForTimeout(3000);
    });

    test('Should show error for incorrect credentials', async ({ page }) => {
        await page.fill('input[name="email"]', 'wronguser@example.com');
        await page.fill('input[name="password"]', 'WrongPass123');

        await page.click('button:has-text("Login")');

   
        
        await page.waitForTimeout(3000);
    });

});
