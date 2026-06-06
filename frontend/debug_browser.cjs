const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Users\\asus\\.cache\\puppeteer\\chrome\\win64-149.0.7827.22\\chrome-win64\\chrome.exe'
    });
    const page = await browser.newPage();
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('BROWSER ERROR:', msg.text());
      }
    });

    page.on('pageerror', error => {
      console.log('PAGE ERROR:', error.message);
    });

    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
    console.log('Page loaded.');
    
    await browser.close();
  } catch (err) {
    console.error('Script Error:', err);
  }
})();
