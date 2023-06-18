const puppeteer = require('puppeteer');

(async () => {
  // Step 1: Simulate user interaction using Puppeteer
  const browser = await puppeteer.launch({ headless: false }); // Launch non-headless browser
  const page = await browser.newPage();

  // Step 2: Navigate to the login page
  await page.goto('https://www.instagram.com/accounts/login');

  // Step 3: Fill in the login form and submit
  await page.type('input[name="username"]', 'your-username');
  await page.type('input[name="password"]', 'your-password');
  await Promise.all([
    page.waitForNavigation(),
    page.click('button[type="submit"]')
  ]);

  // Step 4: Check if login was successful
  const loginSuccessful = await page.evaluate(() => {
    return !document.querySelector('form[action="/accounts/login"]');
  });

  if (loginSuccessful) {
    // Step 5: Navigate to your account's feed page
    await page.goto('https://www.instagram.com/your-account-feed');

    // Step 6: Create a script to extract information
    const postLinks = await page.$$eval('.post-container a', links => links.map(link => link.href));
    const mediaElements = await page.$$eval('.media-element', elements => elements.map(element => element.src));

    // Step 7: Store the retrieved data
    const postData = {
      postLinks: postLinks,
      mediaElements: mediaElements
    };

    console.log(postData);
  } else {
    console.log('Login failed. Please check your username and password.');
  }

  // Keep the browser open for observation
  // await browser.close();
})();
