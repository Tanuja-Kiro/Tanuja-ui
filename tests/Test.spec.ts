import { test, expect } from '@playwright/test';

/*
1. Open LambdaTest’s Selenium Playground from
https://www.lambdatest.com/selenium-playground
2. Click “Simple Form Demo”.
3. Validate that the URL contains “simple-form-demo”.
4. Create a variable for a string value e.g.: “Welcome to LambdaTest”.
5. Use this variable to enter values in the “Enter Message” text box.
6. Click “Get Checked Value”.
7. Validate whether the same text message is displayed in the right-hand
panel under the “Your Message:” section.
*/
test('Test Scenario 1', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground');
  await page.getByText('Simple Form Demo').click();

  const message: string = 'Welcome to LambdaTest'
  await page.getByPlaceholder('Please enter your Message').fill(message);
  await page.getByRole('button', { name: 'Get Checked Value'}).click();
  await expect(page.getByText(message)).toBeVisible();
});

/*
1. Open the https://www.lambdatest.com/selenium-playground page and
click “Drag & Drop Sliders”.
2. Select the slider “Default value 15” and drag the bar to make it 95 by
validating whether the range value shows 95.
*/
test('Test Scenario 2', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground');
  await page.getByText('Drag & Drop Sliders').click();
  const slider = page.locator('//*[@id="slider3"]/div/input')
  await slider.focus();
  for (let i = 0; i < 80; i++) {
    await page.keyboard.down('ArrowRight');
    if (i == 79) {
      await page.keyboard.up('ArrowRight');
      break;
  }
}
const number1: number = Number(await page.locator('#rangeSuccess').textContent());
  await expect(number1).toBe(95);
});

/*
1. Open the https://www.lambdatest.com/selenium-playground page and
click “Input Form Submit”.
2. Click “Submit” without filling in any information in the form.
3. Assert “Please fill in the fields” error message.
4. Fill in Name, Email, and other fields.
5. From the Country drop-down, select “United States” using the text
property.
6. Fill in all fields and click “Submit”.
7. Once submitted, validate the success message “Thanks for contacting
us, we will get back to you shortly.” on the screen.
*/
test('Test Scenario 3', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground');
  await page.getByText("Input Form Submit").click();
  await page.getByRole("button", { name: "Submit"}).click();
  await page.getByRole("textbox", { name: 'Name'}).fill("Test");
  await page.getByRole("textbox", { name: 'Email'}).fill("Test@xyz.com");
  await page.getByRole("textbox", { name: 'Password'}).fill("Password");
  await page.getByRole("textbox", { name: 'Company'}).fill("ABC PVT LTD");
  await page.getByRole("textbox", { name: 'Website'}).fill("ABCPVTLTD.com");
  await page.getByRole('combobox').selectOption("United States")
  await page.getByRole("textbox", { name: 'City', exact: true}).fill("USCity");
  await page.getByRole("textbox", { name: 'Address 1'}).fill("Address 1");
  await page.getByRole("textbox", { name: 'Address 2'}).fill("Address 2");
  await page.getByRole("textbox", { name: 'City* State*'}).fill("Usstate");
  await page.getByRole("textbox", { name: 'Zip Code'}).fill("Zip Code");
  await page.getByRole("button", { name: "Submit"}).click();
  await expect(page.getByText("Thanks for contacting us, we will get back to you shortly.")).toBeVisible();
});
