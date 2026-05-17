const puppeteer = require('puppeteer');

const username = process.env.GITHUB_USERNAME || 'santhoshkammari';

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  await page.goto(`https://github.com/${username}`, {
    waitUntil: 'networkidle2',
    timeout: 30000,
  });

  // Wait for contribution graph to load
  await page.waitForSelector('.js-calendar-graph', { timeout: 15000 });

  const graph = await page.$('.js-calendar-graph');
  await graph.screenshot({ path: 'contribution-graph.png' });

  await browser.close();
  console.log('Screenshot saved: contribution-graph.png');
})();
